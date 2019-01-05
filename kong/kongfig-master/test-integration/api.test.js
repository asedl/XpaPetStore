import execute from '../lib/core';
import { testAdminApi, logger, exportToYaml, getLog, getLocalState, tearDown } from './util';
import readKongApi from '../lib/readKongApi';

describe("API", () => {
    beforeEach(tearDown);

    it("should add the API", async () => {
        const config = {
            apis: [{
                name: "mockbin",
                ensure: "present",
                attributes: {
                    upstream_url: "http://mockbin.com",
                    hosts: ["mockbin.com"]
                }
            }]
        };

        await execute(config, testAdminApi, logger);
        const kongState = await readKongApi(testAdminApi);

        expect(getLog()).toMatchSnapshot();
        expect(exportToYaml(kongState)).toMatchSnapshot();
        expect(getLocalState()).toEqual(kongState);
    });

    it("should not update if already up to date", async () => {
        const config = {
            apis: [{
                name: "mockbin",
                ensure: "present",
                attributes: {
                    upstream_url: "http://mockbin.com",
                    hosts: ["mockbin.com"]
                }
            }]
        };

        await execute(config, testAdminApi, logger);
        await execute(config, testAdminApi, logger);
        const kongState = await readKongApi(testAdminApi);

        expect(getLog()).toMatchSnapshot();
        expect(exportToYaml(kongState)).toMatchSnapshot();
        expect(getLocalState()).toEqual(kongState);
    });

    it("should remove the api", async () => {
        const config = {
            apis: [{
                name: "mockbin",
                ensure: "present",
                attributes: {
                    upstream_url: "http://mockbin.com",
                    hosts: ["mockbin.com"]
                }
            }]
        };

        await execute(config, testAdminApi, logger);

        config.apis[0].ensure = 'removed';

        await execute(config, testAdminApi, logger);
        const kongState = await readKongApi(testAdminApi);

        expect(getLog()).toMatchSnapshot();
        expect(exportToYaml(kongState)).toMatchSnapshot();
        expect(getLocalState()).toEqual(kongState);
    });

    it("should update the api", async () => {
        const config = {
            apis: [{
                name: "mockbin",
                ensure: "present",
                attributes: {
                    upstream_url: "http://mockbin.com",
                    hosts: ["mockbin.com"]
                }
            }]
        };

        await execute(config, testAdminApi, logger);

        config.apis[0].attributes.preserve_host = true;

        await execute(config, testAdminApi, logger);
        const kongState = await readKongApi(testAdminApi);

        expect(getLog()).toMatchSnapshot();
        expect(exportToYaml(kongState)).toMatchSnapshot();
        expect(getLocalState()).toEqual(kongState);
    });
});

describe("API plugins", () => {
    beforeEach(tearDown);

    it("should add mockbin API with a plugins", async () => {
        const config = {
            apis: [{
                name: "mockbin",
                ensure: "present",
                attributes: {
                    upstream_url: "http://mockbin.com",
                    hosts: ["mockbin.com"]
                },
                plugins: [{
                    name: "key-auth",
                    attributes: {
                        config: {
                            key_names: ['foobar']
                        }
                    }
                }]
            }]
        };

        await execute(config, testAdminApi, logger);
        const kongState = await readKongApi(testAdminApi);

        expect(getLog()).toMatchSnapshot();
        expect(exportToYaml(kongState)).toMatchSnapshot();
        expect(getLocalState()).toEqual(kongState);
    });

    it("should remove mockbin api plugin", async () => {
        const config = {
            apis: [{
                name: "mockbin",
                ensure: "present",
                attributes: {
                    upstream_url: "http://mockbin.com",
                    hosts: ["mockbin.com"]
                },
                plugins: [{
                    name: "key-auth",
                    attributes: {
                        config: {
                            key_names: ['foobar']
                        }
                    }
                }]
            }]
        };

        await execute(config, testAdminApi, logger);

        config.apis[0].plugins[0].ensure = 'removed';

        await execute(config, testAdminApi, logger);

        const kongState = await readKongApi(testAdminApi);

        expect(getLog()).toMatchSnapshot();
        expect(exportToYaml(kongState)).toMatchSnapshot();
        expect(getLocalState()).toEqual(kongState);
    });

    it("should update mockbin api plugin", async () => {
        const config = {
            apis: [{
                name: "mockbin",
                ensure: "present",
                attributes: {
                    upstream_url: "http://mockbin.com",
                    hosts: ["mockbin.com"]
                },
                plugins: [{
                    name: "key-auth",
                    attributes: {
                        config: {
                            key_names: ['foobar']
                        }
                    }
                }]
            }]
        };

        await execute(config, testAdminApi, logger);

        config.apis[0].plugins[0].attributes.enabled = false;

        await execute(config, testAdminApi, logger);

        const kongState = await readKongApi(testAdminApi);

        expect(getLog()).toMatchSnapshot();
        expect(exportToYaml(kongState)).toMatchSnapshot();
        expect(getLocalState()).toEqual(kongState);
    });

    it('should add a customer specific plugin');
    it('should update a customer specific plugin');
    it('should remove a customer specific plugin');
});
