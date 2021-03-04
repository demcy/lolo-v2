import React from 'react';
import Filter from './Filter';
import Modal from './Modal';

class App extends React.Component {

    state = {
        initialFeeds: [],
        feeds: [],
        categories: ['All'],
        showModal: false,
        link: ''
    }

    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var x, i, j, xmlDoc;

                xmlDoc = xhttp.responseXML;
                console.log(xmlDoc)
                x = xmlDoc.getElementsByTagName("item");
                for (i = 0; i < x.length; i++) {
                    var catList = []
                    const title = x[i].getElementsByTagName("title")
                    const image = x[i].getElementsByTagName("media:content")
                    const link = x[i].getElementsByTagName("link")
                    const date = x[i].getElementsByTagName("pubDate")
                    const description = x[i].getElementsByTagName("description")
                    const category = x[i].getElementsByTagName("category")
                    for (j = 0; j < category.length; j++) {
                        const c = category[j].childNodes[0].nodeValue
                        catList.push(c)
                        if (!this.state.categories.includes(c)) {
                            this.setState({ categories: [...this.state.categories, c] })
                        }
                        //console.log(category[j].childNodes[0].nodeValue)
                    }
                    let feed = {
                        title: title[0].childNodes[0].nodeValue,
                        image: image[0]?.attributes.getNamedItem("url").nodeValue,
                        link: link[0].childNodes[0].nodeValue,
                        date: date[0].childNodes[0].nodeValue,
                        description: description[0]?.childNodes[0]?.nodeValue,
                        categories: catList,
                        visible: false
                    }
                    if (feed.image == null) {
                        feed.visible = true
                    }
                    this.setState({
                        feeds: [...this.state.feeds, feed],
                        initialFeeds: [...this.state.feeds, feed]
                    })
                }
                this.state.feeds.sort(function (a, b) {
                    return Date.parse(b.date) - Date.parse(a.date)
                })
            }
        };
        //
        xhttp.open("GET", "@raimoseero/feed-nii8kd0sz.rss", true);
        xhttp.send();
    }

    handleMouseEnter(index) {
        const feed = this.state.feeds[index]
        feed.visible = true
        const feeds = [...this.state.feeds]
        feeds[index] = feed
        this.setState({ feeds });
    }

    handleMouseLeave(index) {
        const feed = this.state.feeds[index]
        if (feed.image != null) {
            feed.visible = false
        }
        const feeds = [...this.state.feeds]
        feeds[index] = feed
        this.setState({ feeds });
    }

    handleFilter(categoryName) {
        this.setState({ feeds: this.state.initialFeeds }, () => {
            if (categoryName !== 'All') {
                const feeds = this.state.feeds.filter(function (a) {
                    return a.categories.includes(categoryName)
                })
                this.setState({ feeds: feeds })
            }
        })
        this.state.feeds.sort(function (a, b) {
            return Date.parse(b.date) - Date.parse(a.date)
        })

    }

    showModal(index){
        const feed = this.state.feeds[index]
        this.setState({
            showModal: true,
            link: feed.link
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <>
                <Filter categories={this.state.categories} filterHandler={this.handleFilter.bind(this)} />
                <div className="grid-container">
                    {this.state.feeds.map((feed, index) => (
                        <div key={index} className="grid-item"
                            onMouseEnter={this.handleMouseEnter.bind(this, index)}
                            onMouseLeave={this.handleMouseLeave.bind(this, index)}
                            onClick={this.showModal.bind(this, index)}>
                            {feed.visible
                                ? <>
                                    <h3>{feed.title}</h3>
                                    <p>{feed.description}</p>
                                </>
                                : <img src={feed.image} alt="im"></img>}
                        </div>
                    ))}
                </div>
                {this.state.showModal
                    ? <Modal
                        link={this.state.link}
                        onCloseModal={this.closeModal.bind(this)}
                         />
                    : null}
            </>
        );
    }
}
export default App;