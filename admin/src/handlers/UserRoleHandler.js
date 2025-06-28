import React from 'react'
import { getUserRolesService } from '../services/userRolesService';
import { useSelector } from 'react-redux';

const UserRoleHandler = () => {
    const token = useSelector((state) => state.auth.token);

    const getUserRolesHandler = async(data)=>{
        return await getUserRolesService(data,token).then(res=>{
            // console.log(res);
            return res;
        }).catch(err=>{
            console.log(err);
        })
    }
  return {getUserRolesHandler};
}

export default UserRoleHandler