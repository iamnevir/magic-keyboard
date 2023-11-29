"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  Textarea,
  Switch,
  cn,
} from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AnimateButton from "../animate-button";
import { useState } from "react";
const formOption = z.object({
  tinh: z.string().min(3, { message: "vl ngắn thế, thêm tí đê =))" }),
  huyen: z.string().min(3, { message: "vl ngắn thế, thêm tí đê =))" }),
  xa: z.string().min(3, { message: "vl ngắn thế, thêm tí đê =))" }),
  nha: z.string().min(3, { message: "Chọn 1 đi bro." }),
  address: z.string().min(3, { message: "vl ngắn thế, thêm tí đê =))" }),
});
export function AddressModal({
  value,
  onChange,
}: {
  value: {
    tinh: string;
    huyen: string;
    xa: string;
    nha: string;
    address: string;
  };
  onChange: (value: {
    tinh: string;
    huyen: string;
    xa: string;
    nha: string;
    address: string;
  }) => void;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const form = useForm<z.infer<typeof formOption>>({
    resolver: zodResolver(formOption),
    defaultValues: value
      ? value
      : {
          tinh: "",
          huyen: "",
          nha: "",
          xa: "",
          address: "",
        },
  });
  const onSubmit = async (values: z.infer<typeof formOption>) => {
    console.log(values);
    onChange(values);
    onClose();
  };
  return (
    <>
      {!value.nha ? (
        <Button variant="shadow" onPress={onOpen} color="success">
          Thêm địa chỉ
        </Button>
      ) : (
        <div className=" whitespace-nowrap items-center mt-2 mr-2 flex">
          Địa chỉ:
        </div>
      )}
      <div
        className=" underline cursor-pointer underline-offset-2 items-center flex "
        onClick={onOpen}
      >
        {value.nha !== undefined
          ? `${value.nha}, ${value.address}, ${value.xa}, ${value.huyen}, ${value.tinh}`
          : null}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className=" sm:max-w-md max-w-xs mr-14 sm:m-0"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Địa chỉ nhận hàng
            </ModalHeader>
            <ModalBody>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 dark:bg-xam"
                >
                  <div className=" flex items-center gap-3 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="tinh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold dark:bg-xam dark:text-white">
                            Tỉnh/Thành phố
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="tỉnh"
                              size="sm"
                              {...field}
                              isRequired
                            />
                          </FormControl>
                          <FormMessage className=" text-rose-600" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="huyen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold dark:bg-xam dark:text-white">
                            Huyện
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="huyện"
                              size="sm"
                              {...field}
                              isRequired
                            />
                          </FormControl>
                          <FormMessage className=" text-rose-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" flex items-center gap-3 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="xa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold dark:bg-xam dark:text-white">
                            Xã
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              size="sm"
                              placeholder="xã"
                              isRequired
                            />
                          </FormControl>
                          <FormMessage className=" text-rose-600" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nha"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="pl-2 sm:pl-10">
                            <div className=" flex flex-col sm:items-center items-end gap-3">
                              <Button
                                variant="shadow"
                                onPress={() => field.onChange("Nhà riêng")}
                                color={
                                  field.value === "Nhà riêng"
                                    ? "success"
                                    : "default"
                                }
                              >
                                Nhà riêng
                              </Button>
                              <Button
                                variant="shadow"
                                onPress={() => field.onChange("Văn phòng")}
                                color={
                                  field.value === "Văn phòng"
                                    ? "success"
                                    : "default"
                                }
                              >
                                Văn phòng
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className=" text-rose-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold dark:bg-xam dark:text-white">
                          Địa chỉ cụ thể
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="z115" isRequired />
                        </FormControl>
                        <FormMessage className=" text-rose-600" />
                      </FormItem>
                    )}
                  />{" "}
                  <ModalFooter className=" items-center">
                    <Button
                      variant="shadow"
                      onPress={() => form.handleSubmit(onSubmit)}
                      color="success"
                      type="submit"
                    >
                      Ok
                    </Button>
                  </ModalFooter>
                </form>
              </Form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
