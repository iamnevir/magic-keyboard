import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import SingleFileUpload from "../single-file-upload";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
const CheckOutModal = ({ orderId }: { orderId: Id<"order"> }) => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const generateUploadUrl = useMutation(api.checkout.generateUploadUrl);
  const create = useMutation(api.checkout.create);
  const update = useMutation(api.order.update);
  async function handleSendImage() {
    try {
      setIsLoading(true);
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();
      await create({ image: storageId, orderId, accept: false });
      setSelectedImage(null);
      toast.success("Thanh toán thành công!");
    } catch (error) {
      toast.success("Có gì đó sai sai!!");
    } finally {
      setIsLoading(false);
      onClose();
    }
  }
  return (
    <>
      <Button onPress={onOpen} variant="shadow" color="success">
        Thanh toán ngay
      </Button>
      <Modal
        aria-disabled={isLoading}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className=" max-w-sm sm:max-w-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Chuyển khoản
              </ModalHeader>
              <ModalBody className=" flex items-start">
                <div className=" flex items-center gap-1">
                  <span>Ngân hàng: </span>
                  <Chip variant="shadow" color="success">
                    Địa phủ
                  </Chip>
                </div>
                <div className=" flex items-center gap-1">
                  <span>Số tài khoản: </span>
                  <Chip variant="shadow" color="success">
                    <Snippet hideSymbol className="bg-transparent text-black">
                      0374168741
                    </Snippet>
                  </Chip>
                </div>
                <SingleFileUpload
                  value={selectedImage}
                  onChange={(v: File | null) => setSelectedImage(v)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="shadow" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  onClick={handleSendImage}
                  disabled={isLoading}
                  color="success"
                  variant="shadow"
                >
                  Gửi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckOutModal;
