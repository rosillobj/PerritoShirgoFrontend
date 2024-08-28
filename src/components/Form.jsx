
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"


function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [last_name, setLastName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [email,setEmail] = useState("")
    const [phonenumber,setPhoneNumber] = useState("")
    const [numerovet , setNumeroVet] = useState("")
    const [nombrevet , setNombreVEt] = useState("")
    const [direccionvet, setDireccionVEt] = useState("")
    const [correovet, setCorreoVet] = useState("")
    const [schedule_open ,setScheduleOpen] = useState("")
    const [schedule_close ,setScheduleClose] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password,last_name,first_name,email,phonenumber,numerovet,nombrevet,direccionvet,correovet,schedule_open })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                className="form-input"
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nombres"
            />
            <input
                className="form-input"
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellidos"
            />
                        <input
                className="form-input"
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Telefono"
            />
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Personal"
            />
            <input
                className="form-input"
                type="text"
                value={nombrevet}
                onChange={(e) => setNombreVEt(e.target.value)}
                placeholder="Nombre de la Veterinaria"
            />
                                    <input
                className="form-input"
                type="tel"
                value={numerovet}
                onChange={(e) => setNumeroVet(e.target.value)}
                placeholder="Telefono Veterinaria"
            />
            <input
                className="form-input"
                type="email"
                value={correovet}
                onChange={(e) => setCorreoVet(e.target.value)}
                placeholder="Correo de la Veterinaria"
            />
            <input
                className="form-input"
                type="text"
                value={direccionvet}
                onChange={(e) => setDireccionVEt(e.target.value)}
                placeholder="Direccion Veterinaria"
            />
            <input
                className="form-input"
                type="time"  // Tipo 'time' para seleccionar horarios
                value={schedule_open}
                onChange={(e) => setScheduleOpen(e.target.value)}
                placeholder="Horario de Apertura"
            />

            <label>Horario de Cierre:</label>
            <input
                className="form-input"
                type="time"
                value={schedule_close}
                onChange={(e) => setScheduleClose(e.target.value)}
                placeholder="Horario de Cierre"
            />


            
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form