export const selectAdminOrg = (orgs, orgId) => {
  for(let i=0;i<orgs.length;i++){
    if(orgs[i]._id===orgId){
        return orgs[i];
    }
  }
  return null;
  };
  
