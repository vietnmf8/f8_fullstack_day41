import { Description } from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

function ProductModal({ open, onClose, onSubmit, initialData, title }) {
    /* ==========================================================
     * State
     * ==========================================================*/

    /* State lưu trữ dữ liệu từ formData */
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        brand: "",
        description: "",
        thumbnail: "",
    });

    /* State lỗi validate form */
    const [errors, setErrors] = useState({});

    /* Trạng thái ban đầu của form khi mở Modal */
    useEffect(() => {
        if (open) {
            // Nếu có sản phẩm được chọn
            if (initialData) {
                // Chế độ EDIT
                // Fill data cũ
                setFormData({
                    title: initialData.title || "",
                    price: initialData.price || 0,
                    category: initialData.category || "",
                    brand: initialData.brand || "",
                    description: initialData.description || "",
                    thumbnail: initialData.thumbnail || "",
                });
            } else {
                // Chế độ THÊM
                // Reset form
                setFormData({
                    title: "",
                    price: "",
                    category: "",
                    brand: "",
                    description: "",
                    thumbnail: "",
                });
            }

            // Xóa lỗi cũ
            setErrors({});
        }
    }, [open, initialData]);

    /* ==========================================================
     * Logic
     * ==========================================================*/

    /* Change Input */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear lỗi khi bắt đầu nhập
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    /* Xử lý Validate & Submit */
    const handleSubmit = () => {
        const newErrors = {};

        // Validate các trường bắt buộc
        if (!formData.title.trim())
            newErrors.title = "Tên sản phẩm là bắt buộc";
        if (!formData.price) newErrors.price = "Giá là bắt buộc";
        if (!formData.category.trim())
            newErrors.category = "Danh mục là bắt buộc";
        if (!formData.brand.trim()) newErrors.brand = "Thương hiệu là bắt buộc";
        if (!formData.description.trim())
            newErrors.description = "Mô tả là bắt buộc";

        // Nếu vẫn có lỗi thì không cho submit
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Chuẩn bị payload để gửi đi
        const payload = {
            ...formData,
            price: Number(formData.price),
            thumbnail:
                formData.thumbnail.trim() ||
                `https://picsum.photos/200?random=${Date.now()}`,
            // Các trường required từ API => ẩn đi để không làm khó người dùng
            stock: 100,
            sku: `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            brand: formData.brand || "No Brand",
            weight: 1,
            width: 10,
            height: 10,
            length: 10,
            minimumOrderQuantity: 1,
            returnPolicy: "No return policy",
            tags: ["general", "new"],
            discountPercentage: 5,
            rating: 5,
        };

        // Submit
        onSubmit(payload);
    };

    /* ==========================================================
     * JSX
     * ==========================================================*/
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Tên sản phẩm */}
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-left">
                            Tên sản phẩm <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                            <span className="text-xs text-red-500">
                                {errors.title}
                            </span>
                        )}
                    </div>

                    {/* Giá & Thương hiệu (2 cột) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">
                                Giá ($) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className={errors.price ? "border-red-500" : ""}
                            />
                            {errors.price && (
                                <span className="text-xs text-red-500">
                                    {errors.price}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="brand">
                                Thương hiệu{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className={errors.brand ? "border-red-500" : ""}
                            />
                            {errors.brand && (
                                <span className="text-xs text-red-500">
                                    {errors.brand}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Danh mục */}
                    <div className="grid gap-2">
                        <Label htmlFor="category">
                            Danh mục <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={errors.category ? "border-red-500" : ""}
                        />
                        {errors.category && (
                            <span className="text-xs text-red-500">
                                {errors.category}
                            </span>
                        )}
                    </div>

                    {/* Ảnh URL */}
                    <div className="grid gap-2">
                        <Label htmlFor="thumbnail">
                            Hình ảnh URL (Tùy chọn)
                        </Label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            placeholder="Để trống sẽ tự sinh ảnh ngẫu nhiên"
                            value={formData.thumbnail}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Mô tả */}
                    <div className="grid gap-2">
                        <Label htmlFor="description">
                            Mô tả <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={
                                errors.description ? "border-red-500" : ""
                            }
                        />
                        {errors.description && (
                            <span className="text-xs text-red-500">
                                {errors.description}
                            </span>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

/* Prop-types */
ProductModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    title: PropTypes.string,
};

export default ProductModal;
