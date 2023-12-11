import { CustomChip } from "@/components/common/chip"

export const chipApplyJob = (status) => {
    switch (status) {
        case "processed":
            return (
                <CustomChip label="Dalam Review" bgcolor="#458AEB" />
            )
        case "rejected":
            return (
                <CustomChip label="Ditolak" bgcolor="#D41C1D" />
            )
        case "accepted":
            return (
                <CustomChip label="Diterima" bgcolor="#17AD47" />
            )
        case "complete":
            return (
                <CustomChip label="Diterima" bgcolor="#17AD47" />
            )
        default:
            break
    }
}