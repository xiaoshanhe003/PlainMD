//TermCard and TermCardMin
const report_svg = (
	<svg className="regular-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="24" height="24" fill="transparent"/>
	<path fillRule="evenodd" clipRule="evenodd" d="M19.7942 18.5L12 5L4.20578 18.5H19.7942ZM12.866 4.5C12.4811 3.83333 11.5189 3.83333 11.134 4.5L3.33975 18C2.95485 18.6667 3.43598 19.5 4.20578 19.5H19.7942C20.564 19.5 21.0452 18.6667 20.6603 18L12.866 4.5Z"/>
	<rect x="11" y="8.5" width="2" height="6" rx="1"/>
	<rect x="11" y="15.5" width="2" height="2" rx="1"/>
	</svg>
	), 
	copy_svg = (
		<svg className="regular-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="24" height="24" fill="transparent"/>
		<path fillRule="evenodd" clipRule="evenodd" d="M7 19.5V20C7 20.5523 7.44772 21 8 21H19C19.5523 21 20 20.5523 20 20V6C20 5.44772 19.5523 5 19 5H18V6H19V20H8V19.5H7Z"/>
		<path d="M4 4C4 3.44772 4.44772 3 5 3H16C16.5523 3 17 3.44772 17 4V18C17 18.5523 16.5523 19 16 19H5C4.44772 19 4 18.5523 4 18V4Z" fill="transparent"/>
		<path fillRule="evenodd" clipRule="evenodd" d="M16 4H5L5 18H16V4ZM5 3C4.44772 3 4 3.44772 4 4V18C4 18.5523 4.44772 19 5 19H16C16.5523 19 17 18.5523 17 18V4C17 3.44772 16.5523 3 16 3H5Z"/>
		</svg>
	),
	image_svg = (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="24" height="24" fill="transparent"/>
		<rect x="4" y="5" width="16" height="13" rx="1" fill="#D2DCE5"/>
		<path fillRule="evenodd" clipRule="evenodd" d="M8 18H19C19.231 18 19.4437 17.9217 19.613 17.7901C17.5707 15.2107 14.0626 11 12.924 11C11.2827 11 8 16.25 8 16.25V18Z" fill="#B5C3D0"/>
		<path fillRule="evenodd" clipRule="evenodd" d="M15.6124 18H5C4.44772 18 4 17.5523 4 17V13.6428C5.09148 12.1356 6.82346 10 7.875 10C9.26037 10 14.189 16.1779 15.6124 18Z" fill="#92A1B0"/>
		<circle cx="16.5" cy="8.5" r="1.5" fill="#92A1B0"/>
		</svg>	
	),
	arrow_svg = (
		<svg className="regular-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="24" height="24" fill="transparent"/>
		<path fillRule="evenodd" clipRule="evenodd" d="M4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L12 13.5858L18.2929 7.29289C18.6834 6.90237 19.3166 6.90237 19.7071 7.29289C20.0976 7.68342 20.0976 8.31658 19.7071 8.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289Z"/>
		</svg>
	);

class TermCard extends React.Component {
	constructor(props) {
	    super(props);
	    this._isMounted=false;
	    this.state = {isToggled: true, copied:false};
	    this.handleClick = this.handleClick.bind(this);
	    this.handleCopy = this.handleCopy.bind(this);
	    this.handleReport = this.handleReport.bind(this);
	    this.handleImage = this.handleImage.bind(this);
	}
	componentDidMount(){
		this._isMounted = true;
	}
	componentWillUnmount(){
		this._isMounted = false;
	}
	//toggle card
	handleClick(event){
		this._isMounted && this.setState({isToggled:!this.state.isToggled});
	}
	//navigate to report page
	handleReport(){
		this.props.onReport(this.props.query);
	}
	//expand image to full screen
	handleImage(){
		this.props.onImage(this.props.query);
	}
	//copy term and definition to clipboard
	handleCopy(event){
		var target=event.target;
		this._isMounted && this.setState({copied:false});
		navigator.clipboard.writeText(this.props.query).then(function() {
		    /* success */
		    this._isMounted && this.setState({copied:true});
		    console.log("success")
		  }.bind(this), function(error) {
		    /* failure */
		    console.log("Error message: " + error)
		    window.alert(error);
		  });
	}
	render() {
		//constants
		//=======
		const item = {
			term: this.props.query[0],
			definition: this.props.query[1],
			imageURL: this.props.query[2],
		};
		//definition with chars more than "max", will be collapsed by default
		const max = 90; 
		//terms with short definition and no image would always be expanded
		const disabled = (!item.imageURL) && (item.definition.length <= max);

		//Toggle or expand: different status for image and definitions
		//=======
		let img = item.imageURL?(<img className="image" src={item.imageURL} onClick={this.handleImage}/>):"";
		let content = {
			collapse: (
				item.definition.length > max?(
					<p>{item.definition.substring(0,max-10)}...</p>
				):(<p>{item.definition}</p>)
			),
			expand: (
				item.imageURL?(
					<div className="row">
						<p className="text-col">{item.definition}</p>
						<div className="image-col">{img}</div>
					</div>
					):(<p>{item.definition}</p>)
			)
		};
		
		return(
			<div className={this.props.type==="selected"?"term-card term-card-selected":"term-card"}>
				<div className="flex-center">
					<div className="row flex-start">
						<h2>{item.term}</h2>
						<div className="inline-block" style={{cursor:"pointer"}} onClick={this.handleImage} >{item.imageURL?image_svg:""}</div>
					</div>
					<div className="iconset">
						<button 
							onClick={this.handleReport} 
							title="Report incorrect definition">
								{report_svg}
						</button>
						<button 
							className={this.state.copied?"message-copied":""} 
							onClick={this.handleCopy} 
							title="Copy this definition to clipboard">
								{copy_svg}
						</button>
						<button 
							className={this.state.isToggled?"":"rotate180"}
							onClick={this.handleClick} 
							title="Expand or collapse card content"
							disabled={disabled}>
								{arrow_svg}
						</button>
					</div>
				</div>
				{ this.state.isToggled? content.collapse : content.expand }
			</div>
			);
	}
}


class TermCardMin extends React.Component {
	constructor(props) {
	    super(props);
	    this._isMounted=false;
	    this.state = {isToggled: true};
	    this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		this._isMounted = true;
	}
	componentWillUnmount(){
		this._isMounted = false;
	}
	handleClick(event){
		if(this.props.query[1].length > 60) this._isMounted && this.setState({isToggled:!this.state.isToggled});
	}
	render() {
		const define=this.props.query[1];
		let def=<p>{define}</p>;
		if(define.length > 70){
			def=(
				<p>{this.state.isToggled? define.substring(0,60)+"... ":define+" "}
					<a href="#" onClick={this.handleClick}>{this.state.isToggled?"expand":"collapse"}</a></p>);
		}
		return(
			<div className="term-card-min">
				<h2>{this.props.query[0]}</h2>
				{def}
			</div>);
	}
}