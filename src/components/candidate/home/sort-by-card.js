import styles from "@/styles/components/candidate/home/Filter.module.scss";
import { Divider } from "@mui/material";
import cn from 'classnames'
import React from "react";

const data = [
    {
        label: 'Lowongan Terbaru',
        value: 'updates'
    },
    {
        label: 'Pendaftar Terbanyak',
        value: 'popular'
    }
]

export default function SortByCard({ setSort, resetBtn, sortBy }) {
    const handleSort = (e) => {
        setSort(e.target.value)
    }

    return(<>
        <div className={cn(styles.filterWrap, "card mb-3")}>
            <b>Urutkan Berdasarkan</b>
            <Divider
                sx={{
                    opacity: "1",
                }}
            />
            <div className={styles.category}>
                {data.map((item, index) => (
                    <div className="form-check" key={index}>
                        <input
                            name="sort"
                            className="form-check-input"
                            type="radio"
                            value={item.value}
                            id={`sort-${index}`}
                            onChange={handleSort}
                            checked={sortBy == item.value ? true : false}
                        />
                        <label className="form-check-label" htmlFor={`sort-${index}`}>
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={resetBtn} className={cn(styles.filterBtn, "btn btn-primary blue")}>
                Reset
            </button>
        </div>
    </>)
}