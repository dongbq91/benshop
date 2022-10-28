import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";
import CommentAdd from "./CommentAdd";
import CommentDelete from "./CommentDelete";
import CommentEdit from "./CommentEdit";

const Comment = (props) => {

    const [comment, setComment] = useState({message: null, success: null, data: {content: []}})
    const [page, setPage] = useState(0)
    let pages = []

    useEffect(() => {
        fetch(BasicApi.getCommentByProductId(props.productId.id, `page=${page}&size=5`).url)
            .then((res) => res.json())
            .then((o) => setComment(o));
    }, [page]);

    const handleReload = () => {
        fetch(BasicApi.getCommentByProductId(props.productId.id, `page=0&size=5`).url)
            .then((res) => res.json())
            .then((o) => {
                setComment(o)
                console.log(o)
            });
    }

    for (let i = 0; i < comment.data.totalPages; i++) {
        pages.push(i)
    }

    return <>
        <div style={{marginTop: 20}}>
            <CommentAdd onReload={handleReload} productId={{id: props.productId.id}} parentId={{id: null}}/>
            <ul>
                {comment.data.content.map(iii =>
                    <li style={{marginTop: 20}}>
                        <p>
                            <span>{(iii.user.firstName != null || iii.user.lastName != null) ? iii.user.firstName + ' ' + iii.user.lastName : 'Ẩn danh'}</span>
                            <span style={{marginLeft: 20}}>
                                <sub>{new Date(iii.updatedDate).toLocaleString()}</sub>
                                </span>
                        </p>
                        <textarea className="form-control" style={{maxWidth: 500, display: "inline", marginTop: -15}}
                                  value={iii.content}>
                            {iii.content}
                        </textarea>
                        <p>
                            <CommentDelete onReload={handleReload} comment={iii}/>
                            <CommentEdit onReload={handleReload} comment={iii}/>
                            <span className="text-primary" style={{margin: "-5px 0 0 10px"}} data-toggle="collapse"
                                  aria-expanded="false"
                                  data-target={`#addComment${iii.id}`}>Trả lời</span><br/>
                            <ul id={`addComment${iii.id}`} className="collapse">
                                <li>
                                    <CommentAdd onReload={handleReload} productId={{id: props.productId.id}}
                                                parentId={{id: iii.id}}/>
                                </li>
                            </ul>
                            <ul>
                                {iii.productComment1.map(o =>
                                    <li style={{marginTop: 20}}>
                                        <p>
                                            <span>{(o.user.firstName != null || o.user.lastName != null) ? o.user.firstName + ' ' + o.user.lastName : 'Ẩn danh'}</span>
                                            <span
                                                style={{marginLeft: 20}}>
                                                <sub>{new Date(o.updatedDate).toLocaleString()}</sub>
                                            </span>
                                        </p>
                                        <textarea className="form-control"
                                                  style={{maxWidth: 500, display: "inline", marginTop: -15}}
                                                  value={o.content}>{o.content}
                                            </textarea><br/>
                                        <CommentDelete onReload={handleReload} comment={o}/>
                                        <CommentEdit onReload={handleReload} comment={o}/>
                                    </li>
                                )}
                            </ul>
                        </p>
                    </li>
                )}
            </ul>
        </div>
        <div style={{width: 350, margin: "20px auto 0 auto"}}>
            {pages.map(o =>
                <input className="btn border border-success page__hover" key={o} type="button" value={o}
                       onClick={(e) => setPage(e.target.value)}/>)}
        </div>
    </>
}
export default Comment