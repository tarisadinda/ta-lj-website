import { CustomChip } from "@/components/common/chip"

export const chipApplyJob = (status) => {
    switch (status) {
        case "processed":
            return (
                <CustomChip label="Dalam Review" bgcolor="#458AEB" />
            )
        case "rejected":
            return (
                <CustomChip label="Ditolak" bgcolor="#17AD47" />
            )
        case "accepted":
        case "complete":
            return (
                <CustomChip label="Diterima" bgcolor="#D41C1D" />
            )
        default:
            break
    }
}