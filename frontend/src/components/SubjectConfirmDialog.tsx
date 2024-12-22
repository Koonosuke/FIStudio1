import React from 'react';

// SubjectConfirmDialogのprops型定義
interface SubjectConfirmDialogProps {
  message: string;
  subjectId: number;
  onConfirm: (subjectId: number) => void;
  onCancel: () => void;
}

// 確認ダイアログのコンポーネント
const SubjectConfirmDialog: React.FC<SubjectConfirmDialogProps> = ({ message, subjectId, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <button onClick={() => onConfirm(subjectId)}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

// 簡単なスタイル
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default SubjectConfirmDialog;
