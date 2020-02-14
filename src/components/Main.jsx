import React, { Component, Fragment } from 'react';
import PDF from './PDF.jsx';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

class App extends Component {
  render(){
      return (
          <Fragment>
              <div>
                  <PDFDownloadLink 
                    class="btn btn-primary" 
                    document={<PDF data={this.props.data}/>} 
                    fileName="somename.pdf" 
                    style={{ padding: 5, backgroundColor: '#000', color: '#ffff00'}}
                  >
                  {({ blob, url, loading, error }) => (loading ? 'Loading PDF...' : 'Download PDF!')}
                  </PDFDownloadLink>
              </div>
              <div >
                  <PDFViewer style={{width: 1200, height: 800, marginTop: 8 }}>
                      <PDF data={this.props.data}/>
                  </PDFViewer>
              </div>
          </Fragment>
      )
  }
}

export default class Main extends Component{

  constructor(props) {
    super(props);
    this.state = { 
        dataRelatorio: {
          time: ["10:00", "11:00", "12:00"],
          occurrences: [1,3,7]
        }
    };
  }  
  render(){
    return (
      <Fragment><App data={ this.state.dataRelatorio } /></Fragment>
    );
  }
}
