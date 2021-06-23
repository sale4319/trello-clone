import React, { useContext, useEffect, useState } from 'react';
import { RiWindow2Line, RiFileList2Line, RiDeleteBin6Fill, RiCloseFill } from 'react-icons/ri';
import { FiList } from 'react-icons/fi';

import { CardModalContext } from '../../providers/';
import {
    useEditCard,
    useDeleteCard,
    useSetCardDescription,
    useCreateComment,
    useEditCardComment,
    useDeleteCardComment,
    useLoadCardComments
} from '../../api/apiHooks/apiCards';

const CardModal = ({ card, handleClose }) => {
    const { setShowModal, selectedCardComments } = useContext(CardModalContext);

    const [cardName, setCardName] = useState(card.name);
    const [submitNewName, setSubmitNewName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const { isSuccess: isEditNameSuccess } = useEditCard(submitNewName, card.id);

    const [description, setDescription] = useState(card.desc ?? '');
    const [submitDescription, setSubmitDescription] = useState('');
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const { isSuccess: isSetDescriptionSuccess } = useSetCardDescription(card.id, submitDescription);

    const [newComment, setNewComment] = useState('');
    const [submitNewComment, setSubmitNewComment] = useState('');
    const [isWritingComment, setIsWritingComment] = useState(false);
    useLoadCardComments(card.id);
    const { isSuccess: isCreateNewCommentSuccess } = useCreateComment(card.id, submitNewComment);

    const [isEditingComment, setIsEditingComment] = useState(false);
    const [editedComment, setEditedComment] = useState({ commentId: '', value: '' });
    const [submitCommentEditValue, setSubmitCommentEditValue] = useState('');
    const { isSuccess: isSuccessEditingComment } = useEditCardComment(
        card.id,
        editedComment.commentId,
        submitCommentEditValue,
    );

    const [submitDeleteCommentId, setSubmitDeleteCommentId] = useState('');
    const { isSuccess: isSuccessDeleteComment } = useDeleteCardComment(card.id, submitDeleteCommentId);

    const [submitDeleteCard, setSubmitDeleteCard] = useState('');
    const { isSuccess: isSuccessDeleteCard } = useDeleteCard(submitDeleteCard);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    useEffect(() => {
        if (isCreateNewCommentSuccess && submitNewComment) {
            setSubmitNewComment('');
        }
    }, [isCreateNewCommentSuccess]);

    useEffect(() => {
        if (isSuccessDeleteComment && submitDeleteCommentId) {
            setSubmitDeleteCommentId('');
        }
    }, [isSuccessDeleteComment]);

    useEffect(() => {
        if (submitCommentEditValue && isSuccessEditingComment) {
            setSubmitCommentEditValue('');
        }
    }, [submitCommentEditValue]);

    useEffect(() => {
        if (isEditNameSuccess && submitNewName) {
            setSubmitNewName('');
        }
    }, [isEditNameSuccess]);

    useEffect(() => {
        if (isSetDescriptionSuccess && submitDescription) {
            setSubmitDescription('');
        }
    }, [isSetDescriptionSuccess]);

    useEffect(() => {
        if (isSuccessDeleteCard && submitDeleteCommentId) {
            setSubmitDeleteCard('');
        }
    }, [isSuccessDeleteCard]);

    const handleSaveComment = () => {
        if (newComment) {
            setSubmitNewComment(newComment);
            setNewComment('');
        }
        setIsWritingComment(false);
    };

    const handleOnClickEditComment = (comment) => {
        setIsEditingComment(true);
        setEditedComment({
            commentId: comment.id,
            value: comment.data.text,
        });
    };

    const handleDeleteComment = (commentId) => {
        setSubmitDeleteCommentId(commentId);
    };

    const handleDeleteCard = () => {
        setSubmitDeleteCard(card.id);
    };

    const handleKeyPressEnterEditComment = (event) => {
        if (event.key === 'Enter') {
            setIsEditingComment(false);
            setSubmitCommentEditValue(editedComment.value);
        }
    };

    const handleChangeEditComment = (event) => {
        setEditedComment({
            ...editedComment,
            value: event.target.value,
        });
    };

    const handleKeyPressEnterComment = (event) => {
        if (event.key === 'Enter') {
            handleSaveComment();
        }
    };

    const handleKeyPressEnterName = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (cardName && cardName !== card.name) {
                setSubmitNewName(cardName);
            }
            setIsEditingName(false);
        }
    };

    const handleBlurName = () => {
        if (cardName && cardName !== card.name) {
            setSubmitNewName(cardName);
        }
        setIsEditingName(false);
    };

    const handleDescriptionClick = () => setIsEditingDescription(true);

    const handleSaveDescription = () => {
        if (description !== card.desc) {
            setSubmitDescription(description);
        }
        setIsEditingDescription(false);
    };

    const handleCancelDescription = () => {
        setDescription(card.desc ?? '');
        setIsEditingDescription(false);
    };

    return (
        <div className="card-modal-container">
            <div className="card-modal-content">
                <div className="card-modal-body">
                    <div className="card-modal-title">
                        <RiWindow2Line className="card-modal-icon" />
                        <div className="card-modal-subtitle" onClick={() => setIsEditingName(true)}>
                            {!isEditingName ? (
                                <span>{cardName}</span>
                            ) : (
                                <input
                                    autoFocus
                                    value={cardName}
                                    onChange={event => setCardName(event.target.value)}
                                    onKeyPress={handleKeyPressEnterName}
                                    onBlur={handleBlurName}
                                />
                            )}
                        </div>
                        <RiDeleteBin6Fill
                            className="card-modal-delete-comment-icon flex-content-end"
                            size={25}
                            onClick={() => handleDeleteCard()}
                            title="Delete this card"
                        />
                    </div>
                    <div className="card-modal-divider" />

                    <div>
                        <div className="card-modal-title">
                            <RiFileList2Line className="card-modal-icon" />
                            <div className="card-modal-subtitle">Description</div>
                        </div>
                        <div>
                            <textarea
                                onClick={handleDescriptionClick}
                                value={description}
                                placeholder="Add a more detailed description"
                                className="card-modal-input"
                                onChange={event => setDescription(event.target.value)}
                                onBlur={() => setIsWritingComment(false)}
                            />
                        </div>
                        {isEditingDescription && (
                            <div className="card-modal-buttons-container">
                                <div className="card-modal-button card-modal-description-save-button card-modal-activity-button" onClick={handleSaveDescription}>
                                    SAVE
                                </div>
                                <div className="card-modal-description-close-button" onClick={handleCancelDescription}>
                                    <RiCloseFill />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="card-modal-divider" />

                    <div>
                        <div className="card-modal-title">
                            <FiList className="card-modal-icon" />
                            <span className="card-modal-subtitle">Activity</span>
                        </div>
                        <div>
                            <input
                                value={newComment}
                                placeholder="Write a comment..."
                                className="card-modal-activity-input"
                                type="text"
                                onClick={() => setIsWritingComment(true)}
                                onChange={event => setNewComment(event.target.value)}
                                onKeyPress={event => handleKeyPressEnterComment(event)}
                            />
                            <div
                                hidden={!isWritingComment || !newComment}
                                className="card-modal-button card-modal-description-save-button card-modal-activity-button"
                                onClick={handleSaveComment}>
                                Save
                            </div>

                            <div>
                                {selectedCardComments.map((comment) => (
                                    <div key={comment.id}>
                                        {isEditingComment && editedComment.commentId === comment.id ? (
                                            <div>
                                                <input
                                                    autoFocus
                                                    className="card-modal-edit-comment-input card-modal-editing-input"
                                                    value={editedComment.value}
                                                    onBlur={() => setIsEditingComment(false)}
                                                    onChange={handleChangeEditComment}
                                                    onKeyPress={handleKeyPressEnterEditComment}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="general-container">
                                                <div
                                                    className="card-modal-comment-content"
                                                    onClick={() => handleOnClickEditComment(comment)}>
                                                    {comment.data.text}
                                                </div>
                                                <div className="card-modal-comment-content-button">
                                                    <RiDeleteBin6Fill
                                                        className="card-modal-delete-comment-icon"
                                                        size={25}
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                    <div className="card-modal-divider" />

                    <div className="card-modal-footer">
                        <div className="card-modal-button card-modal-button-close" onClick={handleClose}>
                            Close
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardModal