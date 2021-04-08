import React, { Component } from "react";
import { Button, Input, Form, Modal, DatePicker } from "antd";
import { uploadPhoto } from "../../actions/photoActions";
const fileUpload = require('fuctbase64');

export default class PhotoPop extends Component {
    state = {
        image: null,
        date: null,
        description: "",
        location: "",
        photo: null,
        visible: false,
    }

    fileSelectedHandler = event => {
        // console.log(event.target.files[0]);
        fileUpload(event)
            .then((data) => {
                // console.log("base64: ", data.base64);
                this.setState({
                    image: data.base64
                })
            })
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onChangeDate = (date, dateString) => {
        this.setState({ date: date });
    };


    upload = (values) => {
        // console.log(values);
        this.showModal2();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };

    handleUploadOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Form
                    name="photo_upload"
                    className="photo-upload"
                    onFinish={this.onFinish}
                >
                    <Form.Item>
                        <Input type="file" onChange={this.fileSelectedHandler} />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        rules={[{ required: true, message: "Date of Incident" }]}
                    >
                        <DatePicker
                            placeholder="Date"
                            onChange={this.onChangeDate}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Description",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Description"
                            onChange={this.onChange}
                            value={this.state.description}
                            id="description"
                            type="description"
                        />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        rules={[{ required: true, message: "Location of Incident" }]}
                    >
                        <Input
                            placeholder="Location"
                            onChange={this.onChange}
                            value={this.state.location}
                            id="location"
                            type="location"
                        />
                    </Form.Item>
                </Form>
                <Form>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="upload-photo-button"
                        onClick={() => { this.upload(this.state); }}
                    >
                        Upload
                    </Button>
                </Form>
                <Modal
                    title=""
                    visible={this.state.visible2}
                    onOk={this.handleUploadOk}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: true, visible: false, }}
                >
                    <p>Photo Uploaded!</p>
                </Modal>
            </div>
        );
    }
}