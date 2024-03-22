import Image from 'next/image';

import UserInfoElement from "../userInfoElement/UserInfoElement";

import fallbackProfileImage from '@/assets/fallback-profile-picture.jpg'

import styles from './UserInfoCard.module.css';

export default function UserInfoCard({ user }) {
  return(
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <Image src={user?.imagenPerfilUrl || fallbackProfileImage} alt='Profile picture' className={styles.profileImage} />
      </div>
      <div>
        <UserInfoElement title="Nombres" info={user?.nombres}/>
        <UserInfoElement title="Apellidos" info={user?.apellidos}/>
        <UserInfoElement title="E-Mail" info={user?.email}/>
        <UserInfoElement title="Teléfono" info={user?.telefono}/>
        <UserInfoElement title="Tipo de Identificación" info={user?.tipoIdentificacion}/>
        <UserInfoElement title="Número de Identificación" info={user?.numeroIdentificacion}/>
        <UserInfoElement title="Departamento" info={user?.departamento}/>
        <UserInfoElement title="Municipio" info={user?.municipio}/>
        <UserInfoElement title="Dirección" info={user?.direccion}/>
        <UserInfoElement title="Ingresos Mensuales" info={user?.ingresosMensuales}/>
      </div>
    </div>
  );
}