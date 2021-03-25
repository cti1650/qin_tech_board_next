import {useEffect,useState} from "react";
import MemberTag from './MemberTag';
import * as styles from "./Textbox.module.css";

function MembersTextbox(props) {
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const tagsEl = document.getElementById("tags");
        const textarea = document.getElementById("textarea");
        
        textarea.onkeyup = (e) => {
            createTags(e.target.value);

            if (e.key === "Enter") {
                setTimeout(() => {
                e.target.value = "";
                }, 10);

                randomSelect();
            }
        };
    },users);
    function createTags(input) {
        const arr = [];
        const tags = input
            .split("@")
            .filter((tag) => tag.trim() !== "")
            .map((tag) => tag.trim());
        // console.log(tags);
        // if (tags.key > 6) {
        //tagsEl.innerHTML = "";
        tags.forEach((tag) => {
            // const tagEl = document.createElement("MemberTag");
            // tagEl.attributes('user',tag);
            // tagEl.attributes('pop',false);
            // tagsEl.appendChild(tagEl);
            arr.push({'user':tag,'pop':false});
        });
        setUsers(arr);
    }

    function randomSelect() {
        alert('select ok');
    }
    return (
        <>
            <textarea
                name="members_list"
                id="textarea"
                className="border-0 outline-none block rounded-lg w-full my-4"
                placeholder="メンバーをドラッグ&ドロップ"
            >
            </textarea>
            <div className="flex flex-row flex-wrap">
                {
                    users.map((item)=>{
                        return (
                            <MemberTag user={item.user} pop={item.pop}></MemberTag>
                        );
                    })
                }
            </div>
        </>
    )
}

export default MembersTextbox

