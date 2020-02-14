import React, { Component } from 'react';
import Chart from 'chart.js'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, PDFViewer } from '@react-pdf/renderer';

export default class PDF extends Component{
    constructor(props) {
        super(props)

        //Data to Fill the Line Chart
        this.state = {
          data: {
            labels: props.data.time,
            datasets: [
              {
                label: 'React JS Chart to PDF',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: props.data.occurrences,
              }
            ]
          },
          image: ''
        }
      }
    
      componentDidMount(){

        //Chart Options and Styles, responsive and animation NEED to be set as false
        const options = {
          responsive: false,
          animation: false,
          scaleGridLineColor: 'rgba(0,0,0,.05)',
          scaleGridLineWidth: 1,
          scaleShowHorizontalLines: true,
          scaleShowVerticalLines: true,
          bezierCurve: true,
          bezierCurveTension: 0.4,
          pointDot: true,
          pointDotRadius: 4,
          pointDotStrokeWidth: 1,
          pointHitDetectionRadius: 20,
          datasetStroke: true,
          datasetStrokeWidth: 2,
          datasetFill: true,
          legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
        }
    
        //Generate a Context from an Orphan Canvas
        var canvas = document.createElement('canvas');
        canvas.id = "chart";
        canvas.width = 1100;
        canvas.height = 300;
        var ctx = canvas.getContext("2d");
    
        //Generate a Line Chart with the Context
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: this.state.data,
          options: options
        });
    
        //Convert Chart to Image Base64 and Save the on the State
        this.setState({ image: myLineChart.toBase64Image() });
      }
    
      render(){
        
        //PDF Styles
        const styles = StyleSheet.create({
          page: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            width: '100%',
            orientation: 'portrait'
          },
          view: {
            width: '100%',
            height: '100%',
            padding: 0,
            backgroundColor: 'white',
          },
          image: {
            width: '100%',
          }
        });
    
        //Returns the PDF structure
        return (
          <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View style={styles.section}>
                    <Image
                        style={styles.image}
                        src={this.state.image}
                    />
                </View>
            </Page>
        </Document>
        )
      }
}