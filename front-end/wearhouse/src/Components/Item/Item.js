import React, { Component } from "react";
import Tag from "../Tag/Tag";
import "./Item.scss";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//props : item, applyEdit(edit_item), delete
// further task #1 check whether input tag is existing in database (maybe Sprint4)

class Item extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps)
            this.setState({
                category: this.props.item.category,
                tags: this.props.item.tags,
            });
    }

    state = {
        category: this.props.item.category,
        tags: this.props.item.tags,
        todo: "Add tag", //the mode where user enters after clicing button
    };

    componentDidMount() {
        this.setState({
            category: this.props.item.category,
            tags: this.props.item.tags,
        });
    }
    handleCategoryChange(event) {
        this.setState({ category: event.target.value });

        this.props.applyEdit({
            category: event.target.value,
            tags: this.state.tags,
        });
    }

    //Delete Tag
    onDeleteTag(tag) {
        let tags = this.state.tags;
        tags = tags.filter(tg => tg !== tag);
        this.setState({ tags: tags });
        this.props.applyEdit({
            category: this.state.category,
            tags: tags,
        });
    }

    //Edit Tag
    onEditTag(tag, edit_tag) {
        let tags = this.state.tags;
        tags = tags.map(tg => {
            return tg === tag ? edit_tag : tg;
        });
        this.setState({ tags: tags });
        this.props.applyEdit({
            category: this.state.category,
            tags: tags,
        });
    }
    handleItemDelete() {
        this.props.delete();
        this.setState({
            category: this.props.item.category,
            tags: this.props.item.tags,
        });
    }
    //add Tag
    addTag(e) {
        let tags = this.state.tags;
        if (e.keyCode === 13) {
            tags = tags.concat(e.target.value);
            this.setState({ tags: tags });
            e.target.value = "";
        }
        this.props.applyEdit({
            category: this.state.category,
            tags: tags,
        });
    }

    //convert the todo ("Add tag" or "Finish")
    changeMode = () => {
        if (this.state.todo === "Finish")
            this.setState({
                todo: "Add tag",
            });
        else
            this.setState({
                todo: "Finish",
            });
    };
    render() {
        let tags = this.state.tags.map((tag, index) => {
            return (
                <Tag
                    className="tag"
                    tag={tag}
                    key={index}
                    editMode={true}
                    delete={() => this.onDeleteTag(tag)}
                    edit={edit_tag => this.onEditTag(tag, edit_tag)}
                />
            );
        });
        let todo = null;
        let tag_input = null;
        if (this.state.todo === "Finish") {
            tag_input = (
                <input
                    type="text"
                    placeholder="Enter tag"
                    //onChange = further task #1
                    onKeyDown={e => this.addTag(e)}
                ></input>
            );
            todo = <FontAwesomeIcon icon={faCheck} />;
        } else todo = <FontAwesomeIcon icon={faPlus} />;
        return (
            <div className="Item">
                <div className="item-group">
                    <select
                        className="selector"
                        value={this.state.category}
                        onChange={e => this.handleCategoryChange(e)}
                    >
                        <option value="Outer">Outer</option>
                        <option value="UpperBody">UpperBody</option>
                        <option value="LowerBody">LowerBody</option>
                        <option value="FullBody">FullBody</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                    <div className="tag-area"> {tags} </div>
                    <div className="mode-controller" onClick={this.changeMode}>
                        {todo}
                    </div>
                </div>
                <label
                    className="item-deleter"
                    onClick={this.handleItemDelete.bind(this)}
                >
                    X
                </label>

                <div className="tag-container">{tag_input}</div>
            </div>
        );
    }
}
export default Item;