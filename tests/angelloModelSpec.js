describe('Service: angelloModel', function () {

    beforeEach(module('Angello'));

    var modelService;

    beforeEach(inject(function(angelloModel) {
        modelService = angelloModel;
    }));

    describe('#getStatuses', function () {
        it('should get the correct number of statuses', function() {
           expect(modelService.getStatuses().length).toBe(7)
        });

        it('should have a status named "To Do"', function() {
            var statuses = modelService.getStatuses();
            expect(statuses.map(function(status) {return status.name})).toContain('To Do');
        });
    });
});