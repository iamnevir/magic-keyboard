"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  CheckCircle2,
  Compass,
  MessageCircle,
  ShieldCheck,
  ShieldX,
  Store,
  Truck,
} from "lucide-react";
import OrderItemProduct from "./order-item-product";
import { formatCurrency } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CheckOutModal from "./checkout-modal";

import ImageModal from "./image-modal";
import { useRouter } from "next/navigation";
const OrderItem = ({ item }: { item: Doc<"order"> }) => {
  const update = useMutation(api.order.update);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const huyDonHang = () => {
    if (item) {
      update({ id: item._id, orderStatus: "Đã hủy" });
    }
  };
  const checkout = useQuery(api.checkout.getcheckoutByOrder, {
    orderId: item._id,
  });
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Xác nhận hủy
              </ModalHeader>
              <ModalBody>
                <p>
                  Đơn hàng sẽ bị hủy và không thể hoàn tác. Bạn có chắc muốn
                  thực hiện điều này không?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="shadow" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color="success"
                  variant="shadow"
                  onPress={() => {
                    huyDonHang();
                    onClose();
                  }}
                >
                  Chấp nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card>
        <CardHeader className="py-3 sm:p-5">
          <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between w-full gap-2">
            <div className="flex sm:flex-row flex-col sm:items-center items-start gap-2">
              <Store />
              <span className="sm:flex hidden sm:whitespace-nowrap">
                {" "}
                Magic Keyboard
              </span>
              <Chip
                variant="shadow"
                color={
                  item.orderStatus === "Đã nhận hàng"
                    ? "success"
                    : item.orderStatus === "Đã hủy"
                    ? "danger"
                    : "warning"
                }
              >
                <div className=" flex  items-center justify-between gap-2 whitespace-nowrap">
                  {item.orderStatus}
                  {item.orderStatus === "Đã hủy" ? (
                    <ShieldX className="w-5 h-5" />
                  ) : item.orderStatus === "Đã nhận hàng" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Truck className="w-5 h-5" />
                  )}
                </div>
              </Chip>
            </div>
            <div className="flex items-center sm:justify-end justify-between w-full gap-2 ">
              {item.orderStatus !== "Đã hủy" ? (
                !item.isPaid ? (
                  <>
                    {checkout ? (
                      <ImageModal orderId={item._id} />
                    ) : (
                      <>
                        <Chip variant="shadow" color="danger">
                          Chưa thanh toán
                        </Chip>
                        {item.payment === "Chuyển khoản" ? (
                          <CheckOutModal orderId={item._id} />
                        ) : null}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Chip variant="shadow" color="success">
                      Đã thanh toán
                    </Chip>

                    {item.orderStatus === "Đã nhận hàng" ? (
                      <Button variant="shadow" color="success">
                        Đánh giá
                      </Button>
                    ) : null}
                  </>
                )
              ) : null}
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className=" p-5">
          <div className="flex flex-col gap-3 items-center h-full w-full">
            {item.orderItems.map((orderItem, index) => (
              <div key={index} className="w-full">
                <OrderItemProduct orderItem={orderItem} />
              </div>
            ))}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="p-5">
          <div className=" flex flex-col w-full gap-3">
            <div className=" font-semibold flex items-center gap-2 text-lg ml-auto">
              <ShieldCheck />
              {"Tổng tiền: "}
              {formatCurrency(item.totalPrice)}
            </div>

            <div className="font-semibold flex items-center justify-between w-full gap-5">
              <div className="font-semibold">
                {"Địa chỉ: "}
                {item.address}
              </div>
              <div className="font-semibold flex items-center  gap-5">
                <Button
                  onClick={() =>
                    router.push(
                      "https://www.facebook.com/profile.php?id=61553767545916"
                    )
                  }
                  variant="shadow"
                  color="success"
                >
                  <MessageCircle className="w-5 h-5" />
                  Liên hệ
                </Button>
                {item.orderStatus === "Đơn hàng đang đợi được xác nhận" ? (
                  <Button onClick={onOpen} variant="shadow" color="danger">
                    Hủy đơn
                  </Button>
                ) : null}
                {item.isPaid ? (
                  <Button
                    onClick={() =>
                      router.push(`/products/${item.orderItems[0].product}`)
                    }
                    variant="shadow"
                    color="success"
                  >
                    Mua lại
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default OrderItem;
