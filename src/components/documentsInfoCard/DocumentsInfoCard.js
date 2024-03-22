import Link from 'next/link';

import ArticleIcon from '@mui/icons-material/Article';

import styles from './DocumentsInfoCard.module.css';

export default function DocumentsInfoCard({ documentoUrl = "asdasd" }) {
  return(
    <div className={styles.documentsCardContainer}>
      <h2 className={styles.documentsCardTitle}>Documentos Adjuntos</h2>
      {
        documentoUrl ? (
          <div className={styles.documentsCardItem}>
            <ArticleIcon />
            <Link href={documentoUrl}>Documento de identidad</Link>
          </div>
        ) : (
          <p>No hay documentos para mostrar</p>
        )
      }
    </div>
  );
}