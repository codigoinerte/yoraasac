import { ContainerInner } from '../../../components'
import { breadcrumb as bread} from '../../../interfaces';
const breadcrumb:bread[] = [
    { id:1, titulo: 'Stock', enlace: '/stock' },    
    { id:2, titulo: 'Reajuste', enlace: '/stock/reajuste' },
    { id:3, titulo: 'Stock helados detalle', enlace: '' }
];
export const ReajusteDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <></>
    </ContainerInner>
  )
}
