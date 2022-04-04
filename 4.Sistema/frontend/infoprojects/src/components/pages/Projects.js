import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from "../layout/Container"
import Loading from "../layout/Loading"
import LinkButton from "../layout/LinkButton"

import styles from './Projects.module.css'
import ProjectCard from "../project/ProjectCard"

import { request } from '../../utils'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoanding] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        request("/projetos").then((data) => {
            setProjects(data)
            setRemoveLoanding(true)
        })
    }, [])

    function removeProject(id) {
        request(`/projetos/${id}`, { method: 'DELETE' })
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage("Projeto removido com sucesso!")
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text='Criar Projeto' />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category || "Desconhecida"}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects
