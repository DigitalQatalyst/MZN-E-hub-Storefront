"use client";

import Box from "@component/Box";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import ProductIntro from "./ProductIntro";
import { IconButton } from "@component/buttons";
import Product from "@models/product.model";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  product: Product
};

// ===================================================

export default function ProductQuickView({ open, onClose, product }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Card p="1rem" width="100%" maxWidth="800px" borderRadius={8} position="relative">
        <ProductIntro
          product= {product}
        />

        <IconButton
          onClick={onClose}
          style={{
            top: "0.5rem",
            right: "0.5rem",
            cursor: "pointer",
            padding: "0.5rem",
            position: "absolute"
          }}>
          <Icon className="close" color="primary" variant="small">
            close
          </Icon>
        </IconButton>
      </Card>
    </Modal>
  );
}
