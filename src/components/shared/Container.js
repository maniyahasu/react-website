import React from 'react'

const Container = (props) => {
    return (
        <div className="container pt-5 mt-2">
            {props.children}
        </div>
    )
}
export default Container;
