"use client";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Pagination,
  Progress,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import AnimateButton from "../animate-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddressModal } from "./address-modal";
import useCart from "@/hooks/use-shopping-cart";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import NoCartItem from "../cart/no-cart-item";
const CheckOutForm = () => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();
  const create = useMutation(api.order.create);
  const [code, setCode] = useState("");
  const [voucherPrice, setVoucherPrice] = useState("");
  const [isCode, setIsCode] = useState(false);
  const vouchers = useQuery(api.voucher.getvouchers);
  const totalPrice = cart.items.reduce(
    (sum, price) => sum + price.totalPrice!,
    0
  );

  const shipping = (totalPrice * 5) / 100;
  const [total, setTotal] = useState(totalPrice);
  const [ship, setShip] = useState(shipping);

  const applyVoucher = () => {
    const voucher = vouchers?.find((q) => q.code === code);
    if (voucher) {
      if (voucher.type === "tructiep") {
        setTotal(totalPrice - (voucher.price ? voucher.price : 0));
        setVoucherPrice(
          voucher.price ? `- ${formatCurrency(voucher.price)}` : "0"
        );
      } else if (voucher.type === "freeship") {
        setShip(0);
        setVoucherPrice(`Free Ship`);
      } else if (voucher.type === "%") {
        setTotal(
          totalPrice -
            (totalPrice / 100) * (voucher.percent ? voucher.percent : 1)
        );
        setVoucherPrice(
          voucher.percent
            ? `- ${voucher.percent}% (${formatCurrency(
                (totalPrice / 100) * voucher.percent
              )})`
            : "0%"
        );
      }
    } else {
      setShip(shipping);
      setTotal(totalPrice);
      setVoucherPrice("Không khả dụng");
    }
    setIsCode(true);
  };
  const formSchema = z.object({
    phone: z.string().min(8, { message: "vl ngắn thế, thêm tí đê =))" }),
    name: z.string().min(3, { message: "vl ngắn thế, thêm tí đê =))" }),
    address: z
      .object({
        tinh: z.string(),
        huyen: z.string(),
        xa: z.string(),
        nha: z.string(),
        address: z.string(),
      })
      .required(),
    payment: z.string().min(3, { message: "Chọn 1 đi bro." }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      name: "",
      address: {},
      payment: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const orderItems = cart.items.map((item) => ({
      product: item.productId,
      image: item.image,
      price: item.totalPrice ? item.totalPrice : 0,
      quantity: item.quantity,
      option: item.options
        ? item.options?.map((i) => `${i.key}: ${i.value}`).join(", ")
        : "None",
    }));
    create({
      userId: user?.id,
      name: values.name,
      phone: values.phone,
      address: `${values.address.nha}, ${values.address.address}, ${values.address.xa}, ${values.address.huyen}, ${values.address.tinh}`,
      payment: values.payment,
      totalPrice: total,
      isPaid: false,
      code,
      orderStatus: "Đơn hàng đang đợi xác nhận",
      orderItems: orderItems,
    });
    cart.removeAll();
    toast.success("Đặt hàng thành công.");
    router.push("/cart");
  }
  if (cart.items.length < 1) {
    return <NoCartItem />;
  }
  return (
    <div className=" sm:px-[20dvw] flex flex-col sm:flex-row items-start sm:gap-0 gap-4 pb-10">
      <div className=" w-full sm:w-[50%] flex flex-col gap-4 items-start sm:px-0 px-2">
        <div className=" text-3xl font-semibold">Sản phẩm</div>
        <Card className="max-w-xs sm:max-w-none">
          <CardBody className="p-5 gap-4">
            <div className="flex flex-col gap-3 items-center  w-full">
              {cart.items.map((item, index) => (
                <div
                  key={index}
                  className=" flex items-start justify-start gap-3 w-full"
                >
                  <Badge
                    variant="shadow"
                    showOutline={false}
                    content={item.quantity}
                    color="danger"
                    shape="circle"
                    className=""
                  >
                    <Image
                      src={item.image ? item.image : ""}
                      alt="image"
                      width={100}
                      height={100}
                      className=" w-[90px] h-[90px] object-cover rounded-[5px]"
                    />
                  </Badge>
                  <div className=" flex sm:flex-row flex-col items-start justify-between w-full gap-5">
                    <div className=" flex flex-col items-start w-full font-semibold text-xs gap-1">
                      <span>{item.name}</span>
                      {item.options?.map((o) => (
                        <span key={o.key}>
                          {o.key}
                          {": "}
                          <span className="font-normal"> {o.value}</span>
                        </span>
                      ))}
                    </div>
                    <span className=" text-sm">
                      {formatCurrency(item.totalPrice ? item.totalPrice : 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
          <CardFooter className="p-5">
            <div className=" flex flex-col items-start w-full gap-3">
              <div className="flex items-center justify-between sm:gap-5 gap-2 w-full">
                <Input
                  placeholder="mã giảm giá"
                  onValueChange={(value) => setCode(value)}
                  size="sm"
                />
                <Button
                  variant="shadow"
                  onPress={() => applyVoucher()}
                  color="success"
                >
                  Apply
                </Button>
              </div>
              <div className=" font-semibold flex items-center justify-between w-full">
                Tổng tiền hàng:
                <span>{formatCurrency(totalPrice !== 0 ? totalPrice : 0)}</span>
              </div>
              <div className=" font-semibold flex items-center justify-between w-full">
                Phí vận chuyển:
                <span>{formatCurrency(total < 1000000 ? ship : 0)}</span>
              </div>
              {isCode ? (
                <div className=" text-zinc-500 flex items-center justify-between gap-5 w-full">
                  <div>Mã giảm giá: {code}</div>
                  <div>{voucherPrice}</div>
                </div>
              ) : null}
              <div className="font-semibold flex items-center justify-between w-full">
                Tổng tiền:
                <span>
                  {formatCurrency(total < 1000000 ? total + ship : total)}
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full sm:w-[50%] sm:p-0 px-2">
        <div className=" text-3xl font-semibold mb-4">Đặt hàng</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="max-w-xs sm:max-w-none">
              <CardBody className="gap-2 sm:gap-5 ">
                <div className=" flex items-start sm:flex-row flex-col sm:items-center  sm:space-x-5 w-full sm:justify-between">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Tên người nhận</FormLabel>
                        <FormControl>
                          <Input
                            isRequired
                            placeholder="(có thể để ẩn danh)"
                            size="sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className=" text-rose-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            isRequired
                            placeholder="số điện thoại nhận hàng."
                            size="sm"
                            {...field}
                          />
                        </FormControl>{" "}
                        <FormMessage className=" text-rose-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full py-2 justify-center flex items-center ">
                      <FormControl>
                        <AddressModal
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phương thức thanh toán</FormLabel>
                      <FormControl>
                        <div className=" flex items-center gap-4">
                          <Button
                            variant="shadow"
                            onPress={() =>
                              field.onChange("Thanh toán khi nhận hàng")
                            }
                            color={
                              field.value === "Thanh toán khi nhận hàng"
                                ? "success"
                                : "default"
                            }
                          >
                            Thanh toán khi nhận hàng
                          </Button>
                          <Button
                            variant="shadow"
                            onPress={() => field.onChange("Chuyển khoản")}
                            color={
                              field.value === "Chuyển khoản"
                                ? "success"
                                : "default"
                            }
                          >
                            Chuyển khoản
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className=" text-rose-600" />
                    </FormItem>
                  )}
                />

                <Button
                  variant="shadow"
                  onPress={() => form.handleSubmit(onSubmit)}
                  type="submit"
                  color="success"
                >
                  Đặt hàng
                </Button>
              </CardBody>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckOutForm;
