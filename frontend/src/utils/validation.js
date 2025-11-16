export function validateUsername(u){
  if(!u || u.trim()==='') return 'Username is required';
  if(u.length<3) return 'Username too short';
  if(u.length>50) return 'Username too long';
  return '';
}
export function validatePassword(p){
  if(!p || p.trim()==='') return 'Password is required';
  if(p.length<6) return 'Password too short';
  return '';
}
