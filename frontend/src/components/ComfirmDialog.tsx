import React from "react";

/// ConfirmDialog コンポーネントの props の型定義
interface ConfirmDialogProps {
  message: string;
  user: User;
  onConfirm: (user: User) => void;
  onCancel: (user: User) => void;
}

interface User {
  username: string;
  email: string;
  grade: Int16Array;
  isDeleteSet: boolean;
}

// 確認ダイアログのコンポーネント
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  user,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <button onClick={() => onConfirm(user)}>Yes</button>
        <button onClick={() => onCancel(user)}>No</button>
      </div>
    </div>
  );
};

// ConfirmDialog のスタイル (簡単な CSS)
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default ConfirmDialog;
