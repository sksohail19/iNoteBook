import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React from 'react';

function Loader({ count = 6 }) {
    return (
        <div className="container my-3">
            <div className="row">
                {Array.from({ length: count }).map((_, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div className="card p-2" style={{ width: "18rem" }}>
                            <Skeleton height={20} width="80%" borderRadius={10} />
                            <Skeleton height={15} width="40%" className="my-2" />
                            <Skeleton count={3} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Loader;
