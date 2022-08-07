import React from "react";
import { Link } from "react-router-dom"

const Card = ({ pokemon, loading,infoPokemon}) => {
    
    return (
        <>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => {
                    return (
                        <Link to={`/pokeinfo/${item.id}`} key={item.id}>
                            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    )
                })
        }

        </>
    )
}
export default Card;