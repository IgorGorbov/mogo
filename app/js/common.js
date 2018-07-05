$(function() {

    $('.sec-about-content-accordion-item-header')
		.first()
		.addClass('is-open')
        .next('.sec-about-content-accordion-item-text')
        .not(':animated')
        .slideToggle();

    $('.sec-about-content-accordion-item').on('click', '.sec-about-content-accordion-item-header', function(e){
    	e.preventDefault();
      	let contents = $('.sec-about-content-accordion-item-header');
      	for (content of contents) {
      		if(this !== content) {
      			if ($(content).hasClass( "is-open" )) {
                    $(content)
                        .next('.sec-about-content-accordion-item-text')
                        .not(':animated')
                        .slideToggle();
                }
                	content.classList.remove('is-open')
				}
		  }
        this.classList.toggle('is-open');
        $(this)
            .next('.sec-about-content-accordion-item-text')
            .not(':animated')
            .slideToggle();
    });

});
