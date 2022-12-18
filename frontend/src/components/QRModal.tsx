import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { SocialIcon } from 'react-social-icons'
import React from 'react'
import QRCode from "react-qr-code"

function QRModal(props: {urlToShare: string}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Share</Button>

            <Modal id={'share-modal'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Share This</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <QRCode value={props.urlToShare} />
                        <SocialIcon target={'_blank'} url={`https://www.facebook.com/sharer/sharer.php?u=${props.urlToShare}`} />
                        <SocialIcon target={'_blank'} url={`http://twitter.com/share?url=${props.urlToShare}`} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default QRModal