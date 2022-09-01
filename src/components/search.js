import search from "../img/search.svg";
import styled from "styled-components";

const SpanSearch = styled.span`
     display:flex;
     align-items:center;
     border-radius:10px;
     gap:10px;
     background-color: #e2e2e2;
     padding-left:15px;



     img{
        width:20px;
        height:20px;
     }

     input{
        border: 1px solid transparent;
        height: 2.5rem;
        background-color:#e2e2e2;
        outline:none;
     }

`;

function Search() {
    return (
        <div className="search">
            <SpanSearch>
                <img src={search} alt="Search"/>
                <input placeholder="Search" type="text" name="search" />
            </SpanSearch>
        </div>
    );
}

export default Search;
  