/* =========================================
   XRF ELEMENTAL MAP VIEWER
========================================= */


/* =========================================
   MAP FILES
========================================= */

const elementMaps = {

    Al: "maps/Al.jpg",

    Fe: "maps/Fe.jpg",

    Si: "maps/Si.jpg",

    Ti: "maps/Ti.jpg",

    Ca: "maps/Ca.jpg"

};


/* =========================================
   PAGE ELEMENTS
========================================= */

const originalImage =
    document.getElementById("original-image");

const originalToggle =
    document.getElementById("original-toggle");

const elementLayers =
    document.getElementById("element-layers");

const clearButton =
    document.getElementById("clear-elements");

const resetButton =
    document.getElementById("reset-view");


/* =========================================
   CREATE ELEMENT LAYER
========================================= */

function addElementLayer(element) {

    /* Check if it already exists */

    let layer =
        document.getElementById(
            "layer-" + element
        );


    if (layer) {

        return;

    }


    /* Create image */

    layer =
        document.createElement("img");


    layer.id =
        "layer-" + element;


    layer.className =
        "element-layer";


    layer.src =
        elementMaps[element];


    /* Start at 70% opacity */

    layer.style.opacity =
        "0.7";


    /* Add to viewer */

    elementLayers.appendChild(layer);


    /* Debugging information */

    console.log(
        "Added:",
        element,
        elementMaps[element]
    );


    /* Check whether image loaded */

    layer.onload =
        function() {

            console.log(
                element + " map loaded successfully."
            );

        };


    /* Check whether image failed */

    layer.onerror =
        function() {

            console.error(
                "Could not load " +
                elementMaps[element]
            );

            alert(
                "Could not load " +
                elementMaps[element] +
                ". Check the filename and folder."
            );

        };

}


/* =========================================
   REMOVE ELEMENT LAYER
========================================= */

function removeElementLayer(element) {

    const layer =
        document.getElementById(
            "layer-" + element
        );


    if (layer) {

        layer.remove();

    }

}


/* =========================================
   ELEMENT CHECKBOXES
========================================= */

Object.keys(elementMaps).forEach(
    function(element) {


        const checkbox =
            document.getElementById(
                "checkbox-" + element
            );


        const slider =
            document.getElementById(
                "slider-" + element
            );


        const percentage =
            document.getElementById(
                "opacity-" + element
            );


        /* Checkbox */

        checkbox.addEventListener(
            "change",
            function() {


                if (checkbox.checked) {

                    addElementLayer(
                        element
                    );

                }

                else {

                    removeElementLayer(
                        element
                    );

                }

            }
        );


        /* Opacity slider */

        slider.addEventListener(
            "input",
            function() {


                const layer =
                    document.getElementById(
                        "layer-" + element
                    );


                percentage.textContent =
                    Math.round(
                        slider.value * 100
                    ) + "%";


                if (layer) {

                    layer.style.opacity =
                        slider.value;

                }

            }
        );

    }
);


/* =========================================
   ORIGINAL IMAGE ON / OFF
========================================= */

originalToggle.addEventListener(
    "change",
    function() {


        if (
            originalToggle.checked
        ) {

            originalImage.style.display =
                "block";

        }

        else {

            originalImage.style.display =
                "none";

        }

    }
);


/* =========================================
   CLEAR ELEMENTS
========================================= */

clearButton.addEventListener(
    "click",
    function() {


        Object.keys(elementMaps).forEach(
            function(element) {


                removeElementLayer(
                    element
                );


                const checkbox =
                    document.getElementById(
                        "checkbox-" + element
                    );


                checkbox.checked =
                    false;

            }
        );

    }
);


/* =========================================
   RESET
========================================= */

resetButton.addEventListener(
    "click",
    function() {


        /* Show original */

        originalToggle.checked =
            true;

        originalImage.style.display =
            "block";


        /* Remove all maps */

        Object.keys(elementMaps).forEach(
            function(element) {


                removeElementLayer(
                    element
                );


                const checkbox =
                    document.getElementById(
                        "checkbox-" + element
                    );


                checkbox.checked =
                    false;


                /* Reset slider */

                const slider =
                    document.getElementById(
                        "slider-" + element
                    );


                slider.value =
                    "0.7";


                const percentage =
                    document.getElementById(
                        "opacity-" + element
                    );


                percentage.textContent =
                    "70%";

            }
        );

    }
);