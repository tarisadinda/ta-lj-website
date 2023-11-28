import IconBtn from "@/components/common/icon-button";
import SVGAdd from '@/public/icons/add.svg'
import React from "react";

export default function JobExperience() {
    const [time, setTime] = React.useState([])
    const [clickTime, setClickTime] = React.useState(false)
    
    return(<>
        <h4><b>Daftar Lama Bekerja</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn
                title='Rentang Waktu' 
                startIcon={<SVGAdd />}
                onClick={() => setClickTime(!clickTime)}
                className="btn btn-primary blue" 
            />
        </div>
    </>)
}