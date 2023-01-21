export function checkAdminPermissions(roles, userId, checkId){
    if(roles.includes("admin")) return;
    else if(userId!==checkId){
        const error = new Error("You do not have enough permissions. Access is denied")
        error.status = 403;
        throw error;
    }
}