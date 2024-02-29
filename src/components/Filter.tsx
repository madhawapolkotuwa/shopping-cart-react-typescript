import React, { useContext } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { GlobalContext } from '../context/Context'
import Ratings from './Ratings';

const Filter: React.FC = () => {
    const { state: { categories }, filterState: { category, sort, byRating }, filterDispach } = useContext(GlobalContext);

    const handleFilterCategory = (category: string) => {
        if (categories)
            filterDispach({ type: 'FILTER_BY_CATEGORY', payload: category })
    }

    return (
        <div className='filters-container'>
            <div className='filters'>
                <div className="filters-title">Filter Products</div>
                <span>
                    <Form.Check inline name="group1" type="radio" id={`inline-1`} label="Price: Low to High"
                        onChange={() => {
                            filterDispach({
                                type: 'SORT_BY_PRICE',
                                payload: "lowToHigh"
                            })
                        }}
                        checked={sort === "lowToHigh" ? true : false}
                    />
                </span>
                <span>
                    <Form.Check inline name="group1" type="radio" id={`inline-2`} label="Price: High to Low"
                        onChange={() => {
                            filterDispach({
                                type: 'SORT_BY_PRICE',
                                payload: "highToLow"
                            })
                        }}
                        checked={sort === "highToLow" ? true : false}
                    />
                </span>
                <span>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '95%', fontSize: '1.2vw' }}>
                            {category}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: "50vh", overflowY: "auto" }}>
                            {
                                categories.length > 0 ?
                                    categories.map(category => <Dropdown.Item onClick={() => handleFilterCategory(category)} key={category}>{category}</Dropdown.Item>)
                                    : <Dropdown.Item>Empty Categories</Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </span>
                <span>
                    <Form.Check inline name="group1" type="checkbox" id={`inline-3`} label="Include Out of Stock" />
                </span>
                <span>
                    <label style={{ padding: '1vw' }}>Rating: </label>
                    <Ratings rating={byRating} onClick={(i) => filterDispach({
                        type: "FILTER_BY_RATING",
                        payload: i + 1
                    })} />
                </span>
                <Button variant='light' className='fw-bold'
                    onClick={() => filterDispach(
                        {
                            type: "CLEAR_FILTERS",
                            payload: null
                        })
                    }>
                    Clear Filters
                </Button>
                <div className='social'>
                    <ul className="list-unstyled d-flex justify-content-evenly me-2">
                        <li className="d-inline"><a className="text-muted" href="https://www.instagram.com/madhawa_polkotuwa/" target="_blank" rel="noopener noreferrer"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-128.png" alt="Instagram" width="25" height="25" /></a></li>
                        <li className="d-inline"><a className="text-muted" href="https://www.facebook.com/madhawa.Polkotuwa/" target="_blank" rel="noopener noreferrer"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook2_colored_svg-128.png" alt="Facebook" width="25" height="25" /></a></li>
                        <li className="d-inline"><a className="text-muted" href="https://www.linkedin.com/in/madhawa-p-a05418b1/" target="_blank" rel="noopener noreferrer"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-128.png" alt="Linkedin" width="25" height="25" /></a></li>
                        <li className="d-inline"><a className="text-muted" href="https://www.youtube.com/@madhawapolkotuwa6335" target="_blank" rel="noopener noreferrer"><img src="https://www.freeiconspng.com/thumbs/youtube-logo-png/youtube-icon-app-logo-png-9.png" alt="youtube" width="25" height="25" /></a></li>
                        <li className="d-inline"><a className="text-muted" href="https://github.com/madhawapolkotuwa" target="_blank" rel="noopener noreferrer"><img className="rounded-circle" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="github" width="25" height="25" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
//　https://www.youtube.com/@madhawapolkotuwa6335 // https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png
export default Filter