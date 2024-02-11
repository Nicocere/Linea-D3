import { useEffect } from "react";
import React from 'react'

const Pagination = ({ info, setPage , category}) => {

    useEffect(() => {

        setPage(1)
        }, [category, setPage]);

    return (
        <div>
            <div className="div-info-pages">
                <p className="info-pages">Página actual: {info?.Current_Page}</p>
                <p className="info-pages">Total de páginas: {info?.Total_Pages}</p>
            </div>
            <button className="btn-prev" disabled={!info?.Anterior} onClick={() => setPage(prevPage => prevPage - 1)}>
                Anterior
            </button>
            <button className="btn-next" disabled={!info?.Proxima} onClick={() => setPage(prevPage => prevPage + 1)}>
                Siguiente
            </button>
        </div>
    );
};

export default Pagination