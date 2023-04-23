import CrearEventoApp from '@/components/CreateEvent'
import CrearGrupoApp from '@/components/CreateGroup'
import { createEventFn } from '@/services/events'
import { createGroupFn, updateGroupFn } from '@/services/groups'
import React from 'react'


const crearGrupo = () => {
  return (

    <div>      

      < CrearGrupoApp service ={createGroupFn} initialValues ={"Crear Grupo"} />
      < CrearGrupoApp service ={updateGroupFn} initialValues ={"Editar Grupo"} />

      < CrearEventoApp service={createEventFn} initialValues ={"Crear Grupo"}/>
      

    </div>


  )
}

export default crearGrupo
