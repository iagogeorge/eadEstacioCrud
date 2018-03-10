function getQuerystring(key, default_) {
	if (default_ == null)
		default_ = "";
	key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if (qs == null)
		return default_;
	else
		return qs[1];
}

$(document).ready( function() {
	$('.toggle').click( function() {
		$(this).toggleClass('opened').next('.toggable').toggle();
	}).next('.toggable').hide();
	$('td > fieldset').addClass('fieldset-internal');
	
	//	if (getQuerystring('print')) {
	//		$('.toggle').click();
	//		window.print();
	//	}
});

function mostraAba(div) {
	$('.nft').hide(); // OK
	$('#' + div).show();
	// $('#botoes_nft li').removeClass('nftselected'); //OK
	// $('#aba_nft_' + num).show(); //OK
	// $('#tab_' + num).addClass('nftselected');
}
