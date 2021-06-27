import React, {Component} from 'react'


// genre Array
// group By Genre
export default class List extends Component {
    render() {
        let { genres, groupByGenre } = this.props;
        return (
            <ul class="list-group">
                {
                    genres.map((cgobj) => {
                        return (<li class="list-group-item" key={cgobj.id} onClick={() => { groupByGenre(cgobj.name) }}>{cgobj.name}</li>)
                    })
                }

            </ul>
        )
    }
}