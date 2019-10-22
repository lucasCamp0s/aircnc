import React,{useState, useMemo} from 'react';
import './styles.css';
import camera from '../../assets/camera.svg';
import api from '../../services/api';
export default function New( {history} ){
    const [company,setCompany] = useState('');
    const [techs,setTechs] = useState('');
    const [price,setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        () => {return thumbnail? URL.createObjectURL(thumbnail):null},
        [thumbnail]
    )
   async function handleSubmit(event){
        event.preventDefault();

       const data = new FormData();
       const user_id = localStorage.getItem('user');
       data.append('thumbnail',thumbnail);
       //console.log(thumbnail);
       data.append('company',company);
      // console.log(company);
       data.append('techs',techs);
      // console.log(techs);
       data.append('price',price);
      // console.log(price);
     await api.post('/spot', data,{
        headers:{user_id}
    })  
     
    history.push('/dashboard');
}
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{backgroundImage: `url(${preview})`}}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="select img"/>
            </label>
            <label htmlFor="company">EMPRESA</label>
            <input id="company"
            placeholder="Sua empresa incrível"
            value={company}
            onChange = {event => setCompany(event.target.value)}
            />

        <label htmlFor="company">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input id="techs"
            placeholder="Quais tecnologias usam?"
            value={techs}
            onChange = {event => setTechs(event.target.value)}
            />

        <label htmlFor="price">VALOR DA DIÁRIA<span>(em branco para GRATUITO)</span></label>
            <input id="price"
            placeholder="valor por dia"
            value={price}
            onChange = {event => setPrice(event.target.value)}
            />
        <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}