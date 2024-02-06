
export const fetchSearch=async(key,token)=>{
    try{
        const response = await fetch(`https://api.spotify.com/v1/search?q=${key}&type=album%2Cplaylist%2Ctrack%2Cartist&limit=5`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
    
        if(!response.ok) throw new Error("No se ha podido haceder a la busqueda")
        const data = await response.json()
        return data;
        
    }catch(e){
        console.error(e)
    }
}