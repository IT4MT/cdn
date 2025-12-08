console.log("✅ Script injected");

var checkFieldsInterval = setInterval(function() {
    var revField = document.querySelector("[name='contractdaily#$Rev_Miles']");
    var nrField = document.querySelector("[name='contractdaily#$NR_Miles']");
    var totalField = document.querySelector("[name='contractdaily#$Total_Miles']");

    if (revField && nrField && totalField) {
        console.log("✅ Fields found, attaching listeners");

        function updateTotalMiles() {
            var rev = parseFloat(revField.value) || 0;
            var nr = parseFloat(nrField.value) || 0;
            var total = rev + nr;
            totalField.value = total.toFixed(2);
            console.log("📊 Total_Miles updated:", totalField.value);
        }

        revField.addEventListener("input", updateTotalMiles);
        nrField.addEventListener("input", updateTotalMiles);
        updateTotalMiles(); // initialize

        clearInterval(checkFieldsInterval); // stop polling
    } else {
        console.log("⏳ Waiting for fields...");
    }
}, 300);
