
var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
var pokemonSpeciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

var generation2Counter = 1;
var generation3Counter = 1;
var generation4Counter = 1;
var generation5Counter = 1;
var generation6Counter = 1;
var generation7Counter = 1;


$(document).ready(function (event) {

    $('.Xbtn').click(function () {
        $(this).parent().parent().hide();
    })

    getPokemons(1, 152, 1);

    window.onscroll = function () {
        scrollBtn();
    };

    $('#search').on('input', function () {
        for (var i = 0; i < $('.pokemonContainer').length; i++) {
            
            var pokemonName = $($('.pokemonContainer')[i]).find($('.pokemonName')).html();
            var searchVal = $('#search').val();
            var searchValCapitalized = searchVal.charAt(0).toUpperCase() + searchVal.slice(1);

            if (pokemonName.includes(searchValCapitalized)) {
                $($('.pokemonContainer')[i]).show();
            } else {
                $($('.pokemonContainer')[i]).hide();
            }
        }
    })
})

function genClick(btnId) {
    $('.pokemonContainer').hide();

    switch (btnId) {
        case 0:
            $('.pokemonContainer').show();
            break;
        case 1:
            $('.pokemonContainer[generation="1"]').show();
            break;
        case 2:
            if (generation2Counter == 1) {
                getPokemons(152, 252, 2);
                generation2Counter = 2
            } else {
                $('.pokemonContainer[generation="2"]').show();
            }
            
            break;
        case 3:
            if (generation3Counter == 1) {
                getPokemons(252, 387, 3);
                generation3Counter = 2
            } else {
                $('.pokemonContainer[generation="3"]').show();
            }
            break;
        case 4:
            if (generation4Counter == 1) {
                getPokemons(387, 494, 4);
                generation4Counter = 2
            } else {
                $('.pokemonContainer[generation="4"]').show();
            }
            break;
        case 5:
            if (generation5Counter == 1) {
                getPokemons(494, 650, 5);
                generation5Counter = 2
            } else {
                $('.pokemonContainer[generation="5"]').show();
            }
            break;
        case 6:
            if (generation6Counter == 1) {
                getPokemons(650, 722, 6);
                generation6Counter = 2
            } else {
                $('.pokemonContainer[generation="6"]').show();
            }
            break;
        case 7:
            if (generation7Counter == 1) {
                getPokemons(722, 810, 7);
                generation7Counter = 2
            } else {
                $('.pokemonContainer[generation="7"]').show();
            }
            break;
    }
}

function scrollBtn() {
    if ($(this).scrollTop() > 550) {
        $('.goToTopBtn').fadeIn();
    }
    else {
        $('.goToTopBtn').fadeOut();
    }
}

function goToTop() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
}

function getPokemons(firstPokemon, lastPokemon, gen) {

    $('#genContainer').css({ 'opacity': 0, 'pointer-events': 'none' });
    $('.spinnerWrapper').show();

    for (var i = firstPokemon; i < lastPokemon; i++) {

        $.get(pokemonUrl + '/' + i, function (json) {

            var entries = json.pokemon_entries;

            var types;
            var typesPopup;
         
            if (json.types[0].type == undefined) {
                types = '';
                typesPopup = '';
            } else if (json.types[1] == undefined) {
                types = capitalize(json.types[0].type.name);
                typesPopup = 'Type: ' + types;
            } else {
                types = capitalize(json.types[0].type.name) + ', ' + capitalize(json.types[1].type.name);
                typesPopup = 'Types: ' + types;
            }

            var pokemonName = capitalize(json.name);

            var pokemonContainer = $('<div>', {
                class: 'pokemonContainer',
                'generation': gen,
                click: function () {
                    $('#pokemonDetails').show();
                    removePopup($('#pokemonDetails'));
                    $('.pokemonNamePop').html(capitalize(json.name));
                    $('.pokemonTypes').html(typesPopup);
                    $('#pokemonDetails .popupCont').css({ 'background-image': 'url(' + json.sprites.front_default + ')', 'background-repeat': 'no-repeat', 'background-position': 'top' });
                    getEvolutionsInfo($(this));

                    if (types.includes('Grass')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/grass.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Fire')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/fire.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Water')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/water.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Poison')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/poison.jpg)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Flying')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/flying.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Electric')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/electric.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Rock')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/rocks.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Psychic')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/psychic.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': '100% 100%' });
                    } else if (types.includes('Fighting')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/fighting.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': 'contain' });
                    } else if (types.includes('Ground')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/ground.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': 'contain' });
                    } else if (types.includes('Dragon')) {
                        $('.popupContent').css({ 'background-image': 'url(./images/dragon.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': 'contain' });
                    }

                    else {
                        $('.popupContent').css({ 'background-image': 'url(./images/normal.png)', 'background-repeat': 'no-repeat', 'background-position': 'bottom', 'background-size': 'contain' });
                    }
                },
                'pokemonId': json.id

            }).appendTo('#container');

            var pokemonName = $('<p>', {
                class: 'pokemonName',
                'types': types,
                text: pokemonName
            }).appendTo(pokemonContainer);

            var pokemonImg = $('<img>', {
                class: 'pokemonImg',
                alt: 'pokemonImg',
                src: json.sprites.front_default
            }).appendTo(pokemonContainer);
        })
    }

    setTimeout(function () {
        addEvolutionChain();
    }, 1500);

    setTimeout(function () {
        getEvolutions(gen);
    }, 2500);
}

function capitalize(str) {
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

function addEvolutionChain() {

    $.each($('.pokemonContainer'), function (key, value) {
        var that = $(this);

        $.get(pokemonSpeciesUrl + '/' + $(that).attr('pokemonId'), function (json) {
            var pokemonName = $($(that)).find($('.pokemonName')).html();
            $(that).attr('chainUrl', json.evolution_chain.url);
        })
    });
}

function getEvolutions(gen) {

    $.each($('.pokemonContainer'), function (key, value) {
        var that = $(this);

        $.get($(that).attr('chainUrl'), function (json) {

            var pokemonName = $($(that)).find($('.pokemonName')).html();

            if (json.chain == undefined) {

            } else  if (json.chain.evolves_to[0] !== undefined) {

                var firstEvolution;
                var secondEvolution;

                if (pokemonName.toLowerCase() == json.chain.species.name) {
                    firstEvolution = json.chain.evolves_to[0].species.name;

                    $(that).attr('firstEvo', firstEvolution);

                    if (json.chain.evolves_to[0].evolves_to[0] !== undefined) {
                        $(that).attr('secondEvo', json.chain.evolves_to[0].evolves_to[0].species.name);
                    }

                } else if (json.chain.evolves_to[0].evolves_to[0] == undefined && pokemonName.toLowerCase() == json.chain.evolves_to[0].species.name) {
    
                    $(that).attr('secondEvo', json.chain.species.name);
                        
                } else if (json.chain.evolves_to[0].evolves_to[0] !== undefined && pokemonName.toLowerCase() == json.chain.evolves_to[0].species.name) {
                    firstEvolution = json.chain.evolves_to[0].evolves_to[0].species.name;
                    secondEvolution = json.chain.species.name

                    $(that).attr('firstEvo', firstEvolution);
                    $(that).attr('secondEvo', secondEvolution);

                } else if (json.chain.evolves_to[0].evolves_to[0] !== undefined && pokemonName.toLowerCase() == json.chain.evolves_to[0].evolves_to[0].species.name) {
                    firstEvolution = json.chain.species.name;
                    secondEvolution = json.chain.evolves_to[0].species.name

                    $(that).attr('firstEvo', firstEvolution);
                    $(that).attr('secondEvo', secondEvolution);
                }
            }
        })
    });

    setTimeout(function () {
        sortChildrenDivsById("container");
        $('#genContainer').css({ 'opacity': 1, 'pointer-events': 'all' });
        $('.pokemonContainer').show();
        $('.spinnerWrapper').hide();

        switch (gen) {
            case 2:
                $('#gen2Img').click();
                break;
            case 3:
                $('#gen3Img').click();
                break;
            case 4:
                $('#gen4Img').click();
                break;
            case 5:
                $('#gen5Img').click();
                break;
            case 6:
                $('#gen6Img').click();
                break;
            case 7:
                $('#gen7Img').click();
                break;
        }
    }, 0)
}

function getEvolutionsInfo(that) {

    $('#firstEvolution').hide();
    $('#secondEvolution').hide();
    $('#firstEvolution').attr('src', '');
    $('#secondEvolution').attr('src', '');

    var evolutionFrom = $($(that)).attr('firstEvo');
    var evolutionTo = $($(that)).attr('secondEvo');

    if (evolutionFrom !== undefined) {
        $.get(pokemonUrl + '/' + evolutionFrom, function (json) {

            $('#firstEvolution').attr('src', json.sprites.front_default).fadeIn(500);
        });
    } else {
        $('#firstEvolution').hide();
    }

    if (evolutionTo !== undefined) {
        $.get(pokemonUrl + '/' + evolutionTo, function (json) {
            $('#secondEvolution').attr('src', json.sprites.front_default).fadeIn(500);
        });
    } else {
        $('#secondEvolution').hide();
    }
}

function sortChildrenDivsById(parentId) {
    var parent = document.getElementById(parentId);
    var children = $(parent).find('.pokemonContainer');

    var ids = [], obj, i, len;
    for (i = 0, len = children.length; i < len; i++) {
        obj = {};
        obj.element = children[i];
        var pokemonId = $(children[i]).attr('pokemonId');
        obj.idNum = parseInt(pokemonId.replace(/[^\d]/g, ""), 10);
        ids.push(obj);
    }
    ids.sort(function (a, b) { return (a.idNum - b.idNum); });
    for (i = 0; i < ids.length; i++) {
        parent.appendChild(ids[i].element);
    }
}

function removePopup(container) {

    $(document).mouseup(function (e) {
        if (container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            e.stopPropagation();
            $(document).off('mouseup');
        }
    })
}

function closeCurrentPopup(that) {
    $($(that)[0].parentElement.parentElement.parentElement).hide();
}
