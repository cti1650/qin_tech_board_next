import styles from "./Textbox.module.css";
function MemberTag(props) {
    return (
        <>
            <span
                className={(props.pop && 'animate-pulse ') + "tag rounded-lg px-4 py-1 mx-2 my-2 border-1 border-white text-white"}
                style={{
                    'background-color':props.pop?'rgb(216, 249, 4)':'rgba(171, 164, 131, 0.6)',
                    'color':props.pop?'rgb(196, 194, 194)':'white',
                    'box-shadow': '0px 0px 10px #f5eddc',
                }}
            >
                {props.user || 'user'}
            </span>
        </>
    )
}

export default MemberTag