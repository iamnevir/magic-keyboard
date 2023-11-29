import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
const ImageModal = ({ orderId }: { orderId: Id<"order"> }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const removeImage = useMutation(api.checkout.deleteById);
  const remove = useMutation(api.checkout.remove);
  const checkout = useQuery(api.checkout.getcheckoutByOrder, {
    orderId,
  });
  const imageUrl = useQuery(api.checkout.getImage, { image: checkout?.image! });
  const onDelete = async () => {
    if (checkout) {
      try {
        await removeImage({ storageId: checkout.image });
        await remove({ id: checkout?._id });
        onClose();
        toast.success(
          "Xóa ảnh thành công! Bạn có thể thực hiện thanh toán lại."
        );
      } catch (error) {
        onClose();
        toast.error("Có gì đó sai sai!!");
      }
    }
  };
  return (
    <>
      <Tooltip content="Nhấn vào để xem yêu cầu của bạn">
        <Button onPress={onOpen} variant="shadow" color="warning">
          Đã gửi yêu cầu thanh toán
        </Button>
      </Tooltip>

      <Modal
        placement="center"
        className="max-w-sm sm:max-w-md"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-5">
                <Image
                  className=" rounded-[10px] object-contain"
                  width={390}
                  height={350}
                  src={imageUrl ? imageUrl : ""}
                  alt=""
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onDelete} variant="shadow" color="danger">
                  Xóa ảnh
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
