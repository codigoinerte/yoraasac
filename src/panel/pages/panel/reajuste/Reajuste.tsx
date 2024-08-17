import { ContainerInner } from '../../../components'
import { breadcrumb as bread} from '../../../interfaces';
const breadcrumb:bread[] = [
    { id:1, titulo: 'Stock', enlace: '/stock' },    
    { id:2, titulo: 'Reajuste', enlace: '' },
];

export const Reajuste = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <></>
    </ContainerInner>
  )
}
