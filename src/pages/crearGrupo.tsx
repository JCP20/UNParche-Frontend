import CrearEventoApp from '@/components/CreateEvent'
import CrearGrupoApp from '@/components/CreateGroup'
import { createGroupFn } from '@/services/groups'
import React from 'react'


const crearGrupo = () => {
  return (

    <div>      

      < CrearGrupoApp service={createGroupFn} />
      < CrearEventoApp service={createGroupFn} />
      

    </div>


  )
}

export default crearGrupo
