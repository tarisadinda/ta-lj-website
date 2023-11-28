import FrameModal from "@/components/common/frame-modal";

export default function EditTimeModal({ open, onClose }) {
    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Tambah Tahun Pengalaman'
        >

        </FrameModal>
    </>)
}