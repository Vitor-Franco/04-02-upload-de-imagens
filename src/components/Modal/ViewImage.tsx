import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent
        width="auto"
        height="auto"
        maxWidth="900px"
        maxHeight="600px"
        bgColor="pGray.900"
      >
        <ModalBody padding="0">
          <Image
            src={imgUrl}
            alt="Image selected"
            fit="cover"
            maxW="100%"
            maxH="100%"
          />
        </ModalBody>

        <ModalFooter justifyContent="left" bgColor="pGray.900">
          <Link href={imgUrl} isExternal fontSize="14px">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
