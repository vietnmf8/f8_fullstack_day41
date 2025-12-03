import ProductModal from "@/components/ProductModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
    useUpdateProductMutation,
} from "@/services/product";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router";

function Home() {
    /* ==========================================================
     * State
     * ==========================================================*/

    /* Xác định page hiện tại */
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    /* Lấy dữ liệu từ response API */
    const { data, isLoading, isFetching } = useGetProductsQuery({
        page: currentPage,
    });

    /* THÊM/SỬA/XOÁ */
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    /* State quản lý Modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // create | edit
    const [selectedProduct, setSelectedProduct] = useState(null);

    /* ==========================================================
     * Logic
     * ==========================================================*/

    /* Xử lý MỞ Modal TẠO MỚI */
    const handleOpenCreate = () => {
        setModalMode("create");
        setIsModalOpen(true);
        setSelectedProduct(null);
    };

    /* Xử lý MỞ Modal CHỈNH SỬA */
    const handleOpenEdit = (product) => {
        setModalMode("edit");
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    /* Xử lý Submit Modal */
    const handleSubmitModal = async (formData) => {
        try {
            // Nếu ở chế độ TẠO MỚI
            if (modalMode === "create") {
                await createProduct(formData).unwrap();
                alert("Thêm sản phẩm thành công!");
            } else {
                // Nếu ở chế độ CHỈNH SỬA
                await updateProduct({
                    id: selectedProduct.id,
                    ...formData,
                }).unwrap();
                alert("Cập nhật sản phẩm thành công!");
            }

            // Đóng Modal
            setIsModalOpen(false);
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra: " + JSON.stringify(error));
            return error;
        }
    };

    /* Xử lý khi XOÁ product */
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
            try {
                await deleteProduct(id).unwrap();
                alert("Đã xoá thành công!");
            } catch (error) {
                alert("Xóa thất bại!");
                return error;
            }
        }
    };

    /* ==========================================================
     * JSX
     * ==========================================================*/

    /* Hiển thị Loading khi tải dữ liệu từ API */
    if (isLoading)
        return <div className="p-8 text-center">Đang tải dữ liệu...</div>;

    /* Lấy ra danh sách products */
    const products = data?.data?.items || [];

    /* Phân trang */
    const renderPagination = () => {
        if (!data?.data?.pagination) return null;
        const { last_page } = data.data.pagination;

        return Array(last_page)
            .fill()
            .map((_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === currentPage;

                return (
                    <Link
                        key={index}
                        to={`?page=${pageNum}`}
                        className={cn(
                            "mx-1 inline-block min-w-9 rounded border border-gray-800 p-2 text-center text-sm font-medium transition-colors",
                            isActive
                                ? "border-orange-500 bg-orange-500 text-white"
                                : "bg-white text-gray-900 hover:bg-gray-100",
                        )}
                    >
                        {pageNum}
                    </Link>
                );
            });
    };

    return (
        <div className="container mx-auto p-4">
            {/* Heading: Tiêu đề + Nút Thêm Sản phẩm */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
                <Button onClick={handleOpenCreate}>+ Thêm sản phẩm</Button>
            </div>

            {/* Loading khi chuyển trang */}
            {isFetching && (
                <div className="mb-2 text-sm text-blue-500">
                    Đang cập nhật...
                </div>
            )}

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                        <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-gray-100">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.src =
                                        "https://via.placeholder.com/200?text=No+Image";
                                }}
                            />
                        </div>

                        <h3 className="line-clamp-1 text-lg font-semibold">
                            {product.title}
                        </h3>
                        <p className="mb-2 text-sm text-gray-500">
                            {product.brand}
                        </p>
                        <p className="mb-4 font-bold text-blue-600">
                            ${product.price}
                        </p>

                        <div className="mt-auto flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleOpenEdit(product)}
                            >
                                Sửa
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() => handleDelete(product.id)}
                            >
                                Xóa
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
                {renderPagination()}
            </div>

            {/* Modal */}
            <ProductModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitModal}
                initialData={selectedProduct}
                title={
                    modalMode === "create"
                        ? "Thêm sản phẩm mới"
                        : "Chỉnh sửa sản phẩm"
                }
            />
        </div>
    );
}

export default Home;
